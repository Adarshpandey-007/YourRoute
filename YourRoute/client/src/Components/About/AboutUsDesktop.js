import React, {useContext, useEffect, useState} from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
  Stack,
  IconButton,
} from '@mui/material'
import AppContext from '../../appContext'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

const team = [
  {
    name: 'Adarsh Pandey',
    email: 'adarsh.pandey@email.com',
    role: 'Full Stack Developer',
    img: '/about/adarsh.jpg', // Add this image to your public/about folder
    linkedin: 'https://www.linkedin.com/in/adarsh-pandey/',
  },
  {
    name: 'Jiya Bhati',
    email: 'jiya.bhati@email.com',
    role: 'Frontend Developer',
    img: '/about/jiya.jpg', // Add this image to your public/about folder
    linkedin: 'https://www.linkedin.com/in/jiya-bhati/',
  },
]

export default function AboutDesktop() {
  const {darkMode} = useContext(AppContext)
  const [scrollY, setScrollY] = useState(0)

  // Use a light color illustration for the background
  const illustration = '/background/about.png' // Updated illustration path

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Box
      height="100%"
      maxWidth="100%"
      position="relative"
      sx={{
        top: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingX: 4,
        paddingTop: '5vh',
        minHeight: '100vh',
        position: 'relative',
        // Responsive, animated background that always covers the viewport
        '&::before': {
          content: '""',
          position: 'fixed',
          zIndex: -1,
          top: `${Math.max(0, 60 - scrollY * 0.15)}px`,
          left: 0,
          width: '100vw',
          height: '100vh',
          minWidth: '100vw',
          minHeight: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          background: `url('${illustration}') center center / cover no-repeat, ${darkMode ? '#101c2c' : '#f7fafc'}`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          opacity: 0.7,
          transition: 'background 0.3s, top 0.3s',
          pointerEvents: 'none',
        },
      }}
    >
      <Box
        width="100vw"
        minHeight="40vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          background: `linear-gradient(120deg, #1976d2 60%, #43cea2 100%)`,
          boxShadow: 3,
          borderRadius: 4,
          mb: 4,
          mt: 2,
          p: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Typography variant="h2" color="white" fontWeight="bold" mb={2}>
          About YourRoute
        </Typography>
        <Typography variant="h5" color="white" mb={2}>
          Making Public Transit Smarter, Simpler, and Real-Time
        </Typography>
        <Typography
          variant="subtitle1"
          color="white"
          maxWidth="700px"
          textAlign="center"
        >
          YourRoute is a modern web application designed to help commuters
          visualize and track public transportation in real time. Our mission is
          to empower city travelers with live locations, estimated arrivals, and
          smart route planning—all on an interactive, beautiful map.
        </Typography>
      </Box>
      <Typography variant="h3" textAlign="center" mb={3} color="text.primary">
        About Us
      </Typography>
      <Typography variant="h5" textAlign="center" mb={1} color="text.primary">
        Project Goals:
      </Typography>
      <Typography
        variant="subtitle1"
        textAlign="center"
        mb={2}
        color="text.primary"
      >
        YourRoute empowers city travelers with real-time public transit data, smart route planning, and a seamless, accessible experience for everyone.
      </Typography>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        mb={1}
        color="text.primary"
      >
        Contributors:
      </Typography>
      <Grid container justifyContent="center" spacing={4} mt={2} mb={2}>
        {team.map((member, index) => (
          <Grid item key={index} xs={12} md={8} lg={6}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                p: 2,
                borderRadius: 4,
                boxShadow: 6,
                bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'rgba(255,255,255,0.95)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 12,
                },
                position: 'relative',
                overflow: 'visible',
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: '100%',
                  bgcolor: '#43cea2',
                  borderRadius: 2,
                  position: 'absolute',
                  left: -16,
                  top: 16,
                  bottom: 16,
                  display: { xs: 'none', sm: 'block' },
                }}
              />
              <Avatar
                alt={member.name}
                src={member.img}
                sx={{ width: 120, height: 120, m: 2, boxShadow: 3, border: '4px solid #1976d2' }}
              />
              <CardContent
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', sm: 'flex-start' },
                  bgcolor: 'transparent',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <Typography variant="h5" color="text.primary" fontWeight="bold">
                    {member.name}
                  </Typography>
                  <IconButton
                    href={member.linkedin}
                    color="primary"
                    target="_blank"
                    rel="noopener"
                    size="small"
                    disableRipple
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Stack>
                <Typography variant="subtitle1" color="text.secondary" mb={1}>
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Project Call Section - More detailed and aesthetic */}
      <Box
        width="100%"
        mb={4}
        sx={{
          borderRadius: 4,
          boxShadow: 3,
          p: { xs: 3, md: 5 },
          mt: 4,
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none', // Remove background image and gradient
        }}
      >
        <Typography variant="h4" color="#1976d2" fontWeight="bold" mb={2} textAlign="center">
          Why Choose YourRoute?
        </Typography>
        <Typography variant="h6" color="text.primary" mb={2} textAlign="center" maxWidth="700px">
          YourRoute is more than just a transit tracker—it's your smart companion for city travel. Enjoy real-time updates, personalized route planning, accessibility features, and a beautiful, intuitive interface. Whether you're a daily commuter or a first-time visitor, YourRoute makes public transit effortless, reliable, and enjoyable.
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" maxWidth="700px">
          • Real-time bus and metro locations<br/>
          • Smart, AI-powered route suggestions<br/>
          • Accessibility for all users<br/>
          • Offline access and calendar integration<br/>
          • Multi-language support and developer API<br/>
          • Modern, responsive design for every device
        </Typography>
      </Box>
      {/* Features Section - With Title and Section Separation */}
      <Box width="100%" mb={4}>
        <Typography variant="h4" color="#1976d2" fontWeight="bold" mb={3} textAlign="center">
          Key Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#1976d2"><span role="img" aria-label="map">🗺️</span></Box>
              <Typography variant="h6" fontWeight="bold">Live Map Visualization</Typography>
              <Typography variant="body2" color="text.secondary">View real-time positions of buses and metros on an interactive city map.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#43cea2"><span role="img" aria-label="bus">🚌</span></Box>
              <Typography variant="h6" fontWeight="bold">Smart Route Planning</Typography>
              <Typography variant="body2" color="text.secondary">Get optimal routes and estimated arrival times for your journey.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#1976d2"><span role="img" aria-label="devices">📱</span></Box>
              <Typography variant="h6" fontWeight="bold">Responsive Design</Typography>
              <Typography variant="body2" color="text.secondary">Enjoy a seamless experience on both desktop and mobile devices.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#43cea2"><span role="img" aria-label="ai">🤖</span></Box>
              <Typography variant="h6" fontWeight="bold">AI Assistant</Typography>
              <Typography variant="body2" color="text.secondary">Let our AI agent help you plan and optimize your commute.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#1976d2"><span role="img" aria-label="stop">🚏</span></Box>
              <Typography variant="h6" fontWeight="bold">All Stops & Stations</Typography>
              <Typography variant="body2" color="text.secondary">See every bus stop and metro station on the map, with details for each location.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#43cea2"><span role="img" aria-label="clock">⏰</span></Box>
              <Typography variant="h6" fontWeight="bold">Next Arrival Times</Typography>
              <Typography variant="body2" color="text.secondary">Instantly view the next bus or metro arrival time at any stop or station.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#1976d2"><span role="img" aria-label="star">⭐</span></Box>
              <Typography variant="h6" fontWeight="bold">Personalized Routes</Typography>
              <Typography variant="body2" color="text.secondary">Save your favorite routes and get suggestions based on your travel history.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#43cea2"><span role="img" aria-label="bell">🔔</span></Box>
              <Typography variant="h6" fontWeight="bold">Real-Time Notifications</Typography>
              <Typography variant="body2" color="text.secondary">Get notified about arrivals, delays, and service changes instantly.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#1976d2"><span role="img" aria-label="wheelchair">♿</span></Box>
              <Typography variant="h6" fontWeight="bold">Accessibility</Typography>
              <Typography variant="body2" color="text.secondary">Find wheelchair-accessible routes, stops, and vehicles easily.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#43cea2"><span role="img" aria-label="offline">📶</span></Box>
              <Typography variant="h6" fontWeight="bold">Offline Mode</Typography>
              <Typography variant="body2" color="text.secondary">Access schedules and maps even without an internet connection.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#1976d2"><span role="img" aria-label="calendar">📅</span></Box>
              <Typography variant="h6" fontWeight="bold">Calendar Integration</Typography>
              <Typography variant="body2" color="text.secondary">Add trips to your calendar or set reminders for departures and arrivals.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#43cea2"><span role="img" aria-label="money">💸</span></Box>
              <Typography variant="h6" fontWeight="bold">Fare Calculator</Typography>
              <Typography variant="body2" color="text.secondary">Estimate the cost of your trip based on selected routes and modes.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#1976d2"><span role="img" aria-label="language">🌐</span></Box>
              <Typography variant="h6" fontWeight="bold">Multi-Language Support</Typography>
              <Typography variant="body2" color="text.secondary">Use the app in your preferred language for broader accessibility.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#43cea2"><span role="img" aria-label="feedback">💬</span></Box>
              <Typography variant="h6" fontWeight="bold">Feedback & Support</Typography>
              <Typography variant="body2" color="text.secondary">Easily report issues, ask questions, or suggest new features.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#1976d2"><span role="img" aria-label="cluster">🗂️</span></Box>
              <Typography variant="h6" fontWeight="bold">Map Clustering</Typography>
              <Typography variant="body2" color="text.secondary">Cluster nearby stops and vehicles for a cleaner, more readable map.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#43cea2"><span role="img" aria-label="poi">📍</span></Box>
              <Typography variant="h6" fontWeight="bold">Nearby Places</Typography>
              <Typography variant="body2" color="text.secondary">See points of interest like schools, hospitals, and malls on the map.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#1976d2"><span role="img" aria-label="api">🔗</span></Box>
              <Typography variant="h6" fontWeight="bold">Developer API</Typography>
              <Typography variant="body2" color="text.secondary">Access transit data via API for third-party integrations and apps.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      {/* Section Separator */}
      <Box width="100%" my={4}>
        <Box sx={{ borderBottom: '3px dashed #43cea2', width: '100%' }} />
      </Box>
      {/* Call-to-Action Section - More detailed and visually engaging */}
      <Box
        sx={{
          width: '100%',
          mt: 4,
          mb: 2,
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          background: `url('/background/featureDesktop.png') right/contain no-repeat, linear-gradient(100deg, #1976d2 60%, #43cea2 100%)`,
          boxShadow: 6,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4,
        }}
      >
        <Box flex={2}>
          <Typography variant="h4" color="white" fontWeight="bold" mb={1}>
            Ready to Experience Smarter Transit?
          </Typography>
          <Typography variant="h6" color="white" mb={2}>
            Try YourRoute now and transform your daily commute with real-time data, smart planning, and a seamless, beautiful interface. Have feedback or want to collaborate? Reach out to us!
          </Typography>
        </Box>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} flex={1} justifyContent="center">
          <a href="/" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                bgcolor: 'white',
                color: '#1976d2',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontSize: '1.2rem',
                boxShadow: 3,
                transition: 'background 0.2s, color 0.2s',
                '&:hover': {
                  bgcolor: '#43cea2',
                  color: 'white',
                },
                textAlign: 'center',
                display: 'inline-block',
              }}
            >
              Get Started
            </Box>
          </a>
          <a href="mailto:yourroute.team@email.com" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                bgcolor: 'white',
                color: '#43cea2',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontSize: '1.2rem',
                boxShadow: 3,
                transition: 'background 0.2s, color 0.2s',
                '&:hover': {
                  bgcolor: '#1976d2',
                  color: 'white',
                },
                textAlign: 'center',
                display: 'inline-block',
              }}
            >
              Contact Us
            </Box>
          </a>
        </Stack>
      </Box>
    </Box>
  )
}
