const express = require('express')
const router = express.Router()
const axios = require('axios')

// AI Service Configuration for Google Gemini
const AI_SERVICE_CONFIG = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7
}

// Transit-specific prompt engineering for Gemini
const SYSTEM_PROMPT = `You are YourRoute AI, an intelligent transit assistant for Delhi's public transportation system, powered by n8n workflow automation. Your role is to:

1. Help users plan optimal routes using Delhi Metro and DTC buses
2. Provide real-time transit information and updates
3. Consider user preferences (accessibility, walking distance, cost, time)
4. Suggest alternative routes when delays occur
5. Answer questions about transit stops, schedules, and services

IMPORTANT: This platform is currently in active development. Some advanced features like real-time predictions and personalized recommendations are still being implemented. Always mention this development status when appropriate.

Key capabilities:
- Route planning with multiple transport modes
- Real-time status updates (limited during development)
- Accessibility considerations
- Cost optimization
- Time-based recommendations (basic during development)

Always respond in a helpful, conversational tone and provide actionable information. When suggesting routes, provide them in a structured format that can be parsed by the frontend. Include development status notes when relevant.`

// Delhi Metro and Bus Data
const DELHI_TRANSIT_DATA = {
  metroLines: [
    {
      name: 'Yellow Line',
      stations: ['Samaypur Badli', 'Rohini Sector 18-19', 'Haiderpur Badli Mor', 'Jahangirpuri', 'Adarsh Nagar', 'Azadpur', 'Model Town', 'GTB Nagar', 'Vishwavidyalaya', 'Vidhan Sabha', 'Civil Lines', 'Kashmere Gate', 'Chandni Chowk', 'Chawri Bazar', 'New Delhi', 'Rajiv Chowk', 'Patel Chowk', 'Central Secretariat', 'Udyog Bhawan', 'Lok Kalyan Marg', 'Jor Bagh', 'INA', 'AIIMS', 'Green Park', 'Hauz Khas', 'Malviya Nagar', 'Saket', 'Qutab Minar', 'Chhatarpur', 'Sultanpur', 'Ghitorni', 'Arjan Garh', 'Guru Dronacharya', 'Sikandarpur', 'MG Road', 'IFFCO Chowk', 'Millennium City Centre Gurugram']
    },
    {
      name: 'Blue Line',
      stations: ['Dwarka Sector 21', 'Dwarka Sector 8', 'Dwarka Sector 9', 'Dwarka Sector 10', 'Dwarka Sector 11', 'Dwarka Sector 12', 'Dwarka Sector 13', 'Dwarka Sector 14', 'Dwarka', 'Dwarka Mor', 'Nawada', 'Uttam Nagar West', 'Uttam Nagar East', 'Janakpuri West', 'Janakpuri East', 'Tilak Nagar', 'Subhash Nagar', 'Tagore Garden', 'Rajouri Garden', 'Ramesh Nagar', 'Moti Nagar', 'Kirti Nagar', 'Shadipur', 'Patel Nagar', 'Rajendra Place', 'Karol Bagh', 'Jhandewalan', 'Ramakrishna Ashram Marg', 'Rajiv Chowk', 'Barakhamba Road', 'Mandi House', 'Pragati Maidan', 'Indraprastha', 'Yamuna Bank', 'Akshardham', 'Mayur Vihar Phase-1', 'Mayur Vihar Extension', 'New Ashok Nagar', 'Noida Sector 15', 'Noida Sector 16', 'Noida Sector 18', 'Botanical Garden', 'Golf Course', 'Noida City Centre', 'Noida Sector 34', 'Noida Sector 52', 'Noida Sector 61', 'Noida Sector 59', 'Noida Sector 62', 'Noida Electronic City']
    },
    {
      name: 'Red Line',
      stations: ['Shaheed Sthal (New Bus Adda)', 'Hindon River', 'Arthala', 'Mohan Nagar', 'Shyam Park', 'Major Mohit Sharma', 'Raj Bagh', 'Shaheed Nagar', 'Dilshad Garden', 'Jhilmil', 'Mansarovar Park', 'Shahdara', 'Welcome', 'Seelampur', 'Shastri Park', 'Kashmere Gate', 'Tis Hazari', 'Pul Bangash', 'Pratap Nagar', 'Shastri Nagar', 'Inderlok', 'Kanhiya Nagar', 'Keshav Puram', 'Netaji Subhash Place', 'Kohat Enclave', 'Pitampura', 'Rohini East', 'Rohini West', 'Rithala']
    },
    {
      name: 'Green Line',
      stations: ['Inderlok', 'Ashok Park Main', 'Punjabi Bagh', 'Shivaji Park', 'Madipur', 'Paschim Vihar East', 'Paschim Vihar West', 'Peera Garhi', 'Udyog Nagar', 'Surajmal Stadium', 'Nangloi', 'Nangloi Railway Station', 'Rajdhani Park', 'Mundka', 'Mundka Industrial Area', 'Ghevra', 'Tikri Kalan', 'Tikri Border', 'Pandit Shree Ram Sharma', 'Bahadurgarh City', 'Brigadier Hoshiyar Singh']
    }
  ],
  busRoutes: [
    { number: '522', route: 'Dwarka Sector 21 - Kashmere Gate', frequency: '5-8 min' },
    { number: '543', route: 'Rohini Sector 18 - Connaught Place', frequency: '7-10 min' },
    { number: '615', route: 'Pitampura - ITO', frequency: '6-9 min' },
    { number: '729', route: 'Dwarka Sector 8 - Anand Vihar', frequency: '8-12 min' },
    { number: '891', route: 'Rohini Sector 15 - Nehru Place', frequency: '10-15 min' }
  ],
  fareStructure: {
    metro: {
      '0-2': 10,
      '2-5': 20,
      '5-12': 30,
      '12-21': 40,
      '21-32': 50,
      '32+': 60
    },
    bus: {
      '0-4': 10,
      '4-8': 15,
      '8+': 20
    }
  }
}

// Helper function to call Gemini API
async function callGeminiAPI(userMessage, context = '') {
  try {
    if (!AI_SERVICE_CONFIG.GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured')
    }

    const prompt = `${SYSTEM_PROMPT}

${context}

User Query: ${userMessage}

Please provide a helpful response. If suggesting routes, format them as JSON objects with the following structure:
{
  "message": "Your conversational response",
  "routes": [
    {
      "id": 1,
      "title": "Route description",
      "duration": "25 min",
      "distance": "8.2 km",
      "mode": "Metro + Bus",
      "steps": [
        {
          "mode": "walk",
          "duration": "3 min",
          "description": "Walk to nearest metro station"
        }
      ],
      "cost": "₹30",
      "accessibility": true
    }
  ]
}`

    const response = await axios.post(
      `${AI_SERVICE_CONFIG.GEMINI_API_URL}?key=${AI_SERVICE_CONFIG.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: AI_SERVICE_CONFIG.TEMPERATURE,
          maxOutputTokens: AI_SERVICE_CONFIG.MAX_TOKENS,
          topP: 0.8,
          topK: 40
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const aiResponse = response.data.candidates[0].content.parts[0].text
    
    // Try to parse JSON response if it contains route data
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    } catch (parseError) {
      console.log('Could not parse JSON from AI response, returning as message only')
    }

    return {
      message: aiResponse,
      routes: []
    }

  } catch (error) {
    console.error('Gemini API Error:', error.message)
    
    // Fallback responses for common queries
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return {
        message: "Hello! I'm YourRoute AI, your intelligent transit assistant for Delhi, powered by n8n workflow automation. 🚀\n\n⚠️ **Development Status**: This platform is currently in active development. Some features may be limited or unavailable.\n\nHow can I help you plan your journey today?",
        routes: []
      }
    }
    
    if (lowerMessage.includes('metro') || lowerMessage.includes('delhi')) {
      return {
        message: "I can help you navigate Delhi's extensive metro network! Delhi Metro has 8 color-coded lines covering over 390 km. 🚇\n\n⚠️ **Development Status**: This platform is currently in active development. Some features may be limited or unavailable.\n\nWhat's your destination? (Note: Advanced features like real-time predictions are still being implemented)",
        routes: [
          {
            id: 1,
            title: "Sample Metro Route (Development Mode)",
            duration: "20 min",
            distance: "6.5 km",
            mode: "Metro",
            steps: [
              { mode: "walk", duration: "3 min", description: "Walk to nearest metro station" },
              { mode: "metro", duration: "15 min", description: "Take Yellow Line to Central Secretariat" },
              { mode: "walk", duration: "2 min", description: "Walk to destination" }
            ],
            cost: "₹20",
            accessibility: true
          }
        ]
      }
    }
    
    if (lowerMessage.includes('bus') || lowerMessage.includes('dtc')) {
      return {
        message: "Delhi Transport Corporation (DTC) buses serve the entire city with over 3,800 buses on 700+ routes. I can help you find the best bus route! 🚌\n\n⚠️ **Development Status**: This platform is currently in active development. Some features may be limited or unavailable.\n\nWhat's your destination? (Note: Advanced features like real-time predictions are still being implemented)",
        routes: [
          {
            id: 2,
            title: "Sample Bus Route (Development Mode)",
            duration: "35 min",
            distance: "12 km",
            mode: "Bus",
            steps: [
              { mode: "walk", duration: "2 min", description: "Walk to bus stop" },
              { mode: "bus", duration: "30 min", description: "Take bus 522 to destination" },
              { mode: "walk", duration: "3 min", description: "Walk to final destination" }
            ],
            cost: "₹15",
            accessibility: false
          }
        ]
      }
    }
    
    return {
      message: "I'm sorry, I'm having trouble processing your request right now. Please try asking about metro routes, bus schedules, or specific destinations in Delhi.\n\n⚠️ **Development Status**: This platform is currently in active development. Some features may be limited or unavailable.\n\n🔧 **Technical Note**: This AI is powered by n8n workflow automation and is still being optimized for better performance.",
      routes: []
    }
  }
}

// Route to handle AI chat requests
router.post('/chat', async (req, res) => {
  try {
    const { message, preferences = {} } = req.body
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Invalid message format'
      })
    }

    // Build context from user preferences
    let context = ''
    if (preferences.preferredMode && preferences.preferredMode !== 'any') {
      context += `User prefers ${preferences.preferredMode} transport. `
    }
    if (preferences.maxWalkDistance) {
      context += `Maximum walking distance: ${preferences.maxWalkDistance}m. `
    }
    if (preferences.accessibility) {
      context += `Accessibility features required. `
    }
    if (preferences.avoidStairs) {
      context += `Avoid stairs and escalators. `
    }

    // Add transit data context
    context += `Available metro lines: ${DELHI_TRANSIT_DATA.metroLines.map(line => line.name).join(', ')}. `
    context += `Sample bus routes: ${DELHI_TRANSIT_DATA.busRoutes.slice(0, 3).map(route => route.number).join(', ')}. `

    const aiResponse = await callGeminiAPI(message, context)
    
    res.json({
      success: true,
      data: aiResponse
    })

  } catch (error) {
    console.error('AI Chat Error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process AI request'
    })
  }
})

// Route to get transit information
router.get('/transit-info', (req, res) => {
  try {
    const { type, query } = req.query
    
    let result = {}
    
    switch (type) {
      case 'metro-lines':
        result = DELHI_TRANSIT_DATA.metroLines
        break
      case 'bus-routes':
        if (query) {
          result = DELHI_TRANSIT_DATA.busRoutes.filter(route => 
            route.number.includes(query) || route.route.toLowerCase().includes(query.toLowerCase())
          )
        } else {
          result = DELHI_TRANSIT_DATA.busRoutes
        }
        break
      case 'fares':
        result = DELHI_TRANSIT_DATA.fareStructure
        break
      default:
        result = {
          metroLines: DELHI_TRANSIT_DATA.metroLines.length,
          busRoutes: DELHI_TRANSIT_DATA.busRoutes.length,
          fareStructure: DELHI_TRANSIT_DATA.fareStructure
        }
    }
    
    res.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('Transit Info Error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch transit information'
    })
  }
})

// Route to get nearby stops
router.get('/nearby-stops', (req, res) => {
  try {
    const { lat, lng, radius = 1000 } = req.query
    
    if (!lat || !lng) {
      return res.status(400).json({
        error: 'Latitude and longitude are required'
      })
    }

    // Mock nearby stops data
    const nearbyStops = [
      {
        id: 1,
        name: 'Kashmere Gate Metro Station',
        type: 'metro',
        distance: 150,
        lines: ['Red Line', 'Yellow Line'],
        coordinates: { lat: parseFloat(lat) + 0.001, lng: parseFloat(lng) + 0.001 }
      },
      {
        id: 2,
        name: 'Kashmere Gate Bus Stop',
        type: 'bus',
        distance: 200,
        routes: ['522', '543', '615'],
        coordinates: { lat: parseFloat(lat) + 0.002, lng: parseFloat(lng) - 0.001 }
      },
      {
        id: 3,
        name: 'Civil Lines Metro Station',
        type: 'metro',
        distance: 800,
        lines: ['Yellow Line'],
        coordinates: { lat: parseFloat(lat) - 0.001, lng: parseFloat(lng) + 0.002 }
      }
    ].filter(stop => stop.distance <= radius)

    res.json({
      success: true,
      data: nearbyStops
    })

  } catch (error) {
    console.error('Nearby Stops Error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch nearby stops'
    })
  }
})

// Route to get real-time updates
router.get('/real-time', (req, res) => {
  try {
    const { line, station } = req.query
    
    // Mock real-time data
    const realTimeData = {
      timestamp: new Date().toISOString(),
      updates: [
        {
          type: 'delay',
          line: 'Yellow Line',
          station: 'Central Secretariat',
          message: 'Minor delay due to technical issues',
          duration: '5-10 minutes'
        },
        {
          type: 'crowding',
          line: 'Blue Line',
          station: 'Rajiv Chowk',
          message: 'High passenger density',
          severity: 'moderate'
        }
      ],
      generalStatus: 'All lines operating normally'
    }
    
    res.json({
      success: true,
      data: realTimeData
    })

  } catch (error) {
    console.error('Real-time Error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch real-time updates'
    })
  }
})

module.exports = router 