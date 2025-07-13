import React, { useState, useContext, useEffect } from 'react'
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  useTheme,
  useMediaQuery,
  Slide,
  Avatar,
  Button
} from '@mui/material'
import {
  SmartToy as AIIcon,
  Close as CloseIcon,
  Directions as DirectionsIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Warning as WarningIcon,
  Build as BuildIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  Save as SaveIcon
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import AppContext from '../../appContext'
import { useAITripPlanner } from '../../aiTripPlannerContext'
import ChatInterface from './ChatInterface'
import RouteCard from './RouteCard'
import PreferencesModal from './PreferencesModal'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function TripPlanner() {
  const { darkMode } = useContext(AppContext)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { isOpen, isMaximized, closeAITripPlanner, toggleMaximize, openAITripPlanner } = useAITripPlanner()
  
  console.log('TripPlanner rendered - isOpen:', isOpen, 'isMobile:', isMobile)
  
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [suggestedRoutes, setSuggestedRoutes] = useState([])
  const [showPreferences, setShowPreferences] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const [currentChatId, setCurrentChatId] = useState(null)
  const [userPreferences, setUserPreferences] = useState({
    preferredMode: 'any',
    maxWalkDistance: 500,
    avoidStairs: false,
    accessibility: false
  })

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        type: 'ai',
        content: "Hi! I'm YourRoute AI, powered by n8n workflow automation. 🚀\n\n⚠️ **Development Status**: This platform is currently in active development. Some features may be limited or unavailable.\n\nI can help you plan trips using Delhi's transit system, but please note that advanced features like real-time predictions and personalized recommendations are still being implemented.\n\nWhat would you like to know about Delhi Metro and bus routes?",
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
      
      // Save to chat history
      const chatId = Date.now().toString()
      setCurrentChatId(chatId)
      setChatHistory(prev => [...prev, {
        id: chatId,
        title: 'New Chat',
        messages: [welcomeMessage],
        timestamp: new Date()
      }])
    }
  }, [isOpen, messages.length])

  const handleSendMessage = async (message) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // TODO: Integrate with AI backend
      const aiResponse = await processAIResponse(message, userPreferences)
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse.message,
        timestamp: new Date()
      }
      
      const updatedMessages = [...messages, userMessage, aiMessage]
      setMessages(updatedMessages)
      
      // Update chat history
      if (currentChatId) {
        setChatHistory(prev => prev.map(chat => 
          chat.id === currentChatId 
            ? { ...chat, messages: updatedMessages, title: message.substring(0, 30) + '...' }
            : chat
        ))
      }
      
      if (aiResponse.routes) {
        setSuggestedRoutes(aiResponse.routes)
      }
    } catch (error) {
      console.error('AI processing error:', error)
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again.",
        timestamp: new Date()
      }
      const updatedMessages = [...messages, userMessage, errorMessage]
      setMessages(updatedMessages)
      
      // Update chat history with error
      if (currentChatId) {
        setChatHistory(prev => prev.map(chat => 
          chat.id === currentChatId 
            ? { ...chat, messages: updatedMessages }
            : chat
        ))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const processAIResponse = async (message, preferences) => {
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          preferences
        })
      })

      if (!response.ok) {
        throw new Error('AI service not available')
      }

      const result = await response.json()
      return result.data
    } catch (error) {
      console.error('AI API Error:', error)
      
      // Fallback responses
      const lowerMessage = message.toLowerCase()
      
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return {
          message: "Hello! I'm YourRoute AI, powered by n8n workflow automation. 🚀\n\n⚠️ **Development Status**: This platform is currently in active development. Some features may be limited or unavailable.\n\nHow can I help you plan your journey today?",
          routes: []
        }
      }
      
      if (lowerMessage.includes('delhi') || lowerMessage.includes('metro') || lowerMessage.includes('bus')) {
        return {
          message: "I can help you navigate Delhi's transit system! 🚇\n\n⚠️ **Development Status**: This platform is currently in active development. Some features may be limited or unavailable.\n\nWhat's your destination? (Note: Advanced features like real-time predictions are still being implemented)",
          routes: [
            {
              id: 1,
              title: "Sample Route (Development Mode)",
              duration: "25 min",
              distance: "8.2 km",
              mode: "Metro + Bus",
              steps: [
                { mode: "walk", duration: "3 min", description: "Walk to nearest metro station" },
                { mode: "metro", duration: "15 min", description: "Take Yellow Line to Central Secretariat" },
                { mode: "bus", duration: "7 min", description: "Take bus 522 to destination" }
              ],
              cost: "₹30",
              accessibility: true
            }
          ]
        }
      }
      
      return {
        message: "I'm having trouble connecting to my AI service right now. Please try again later or ask me about Delhi Metro and bus routes.\n\n⚠️ **Development Status**: This platform is currently in active development. Some features may be limited or unavailable.\n\n🔧 **Technical Note**: This AI is powered by n8n workflow automation and is still being optimized for better performance.",
        routes: []
      }
    }
  }

  const handleRouteSelect = (route) => {
    // TODO: Navigate to map with selected route
    console.log('Selected route:', route)
  }

  const handlePreferencesUpdate = (newPreferences) => {
    setUserPreferences(newPreferences)
    setShowPreferences(false)
  }

  const handleRefreshChat = () => {
    // Clear current messages and start fresh
    setMessages([])
    setSuggestedRoutes([])
    setCurrentChatId(null)
  }

  const handleClearChat = () => {
    setMessages([])
    setSuggestedRoutes([])
    setCurrentChatId(null)
  }

  const handleNewChat = () => {
    setMessages([])
    setSuggestedRoutes([])
    setCurrentChatId(null)
    setShowHistory(false)
  }

  const handleLoadChat = (chat) => {
    setMessages(chat.messages)
    setCurrentChatId(chat.id)
    setShowHistory(false)
  }

  const handleSaveChat = () => {
    if (messages.length > 1) { // More than just welcome message
      const chatTitle = messages.find(m => m.type === 'user')?.content.substring(0, 30) + '...' || 'Saved Chat'
      const savedChat = {
        id: currentChatId || Date.now().toString(),
        title: chatTitle,
        messages: messages,
        timestamp: new Date()
      }
      
      setChatHistory(prev => {
        const existingIndex = prev.findIndex(chat => chat.id === savedChat.id)
        if (existingIndex >= 0) {
          const updated = [...prev]
          updated[existingIndex] = savedChat
          return updated
        }
        return [...prev, savedChat]
      })
      setCurrentChatId(savedChat.id)
    }
  }

  const quickActions = [
    { label: "Plan Route", icon: <DirectionsIcon />, action: () => handleSendMessage("I need to plan a route") },
    { label: "Nearby Stops", icon: <LocationIcon />, action: () => handleSendMessage("Show me nearby transit stops") },
    { label: "Real-time Info", icon: <TimeIcon />, action: () => handleSendMessage("What's the real-time status?") },
    { label: "New Chat", icon: <HistoryIcon />, action: handleNewChat },
    { label: "Save Chat", icon: <SaveIcon />, action: handleSaveChat }
  ]

  return (
    <>
      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="AI Trip Planner"
          onClick={() => {
            console.log('Mobile FAB clicked, opening AI trip planner...')
            openAITripPlanner()
          }}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
            boxShadow: theme.shadows[8]
          }}
        >
          <AIIcon />
        </Fab>
      )}

      {/* Desktop Floating Action Button (when closed) */}
      {!isMobile && !isOpen && (
        <Fab
          color="primary"
          aria-label="AI Trip Planner"
          onClick={() => {
            console.log('Desktop FAB clicked, opening AI trip planner...')
            openAITripPlanner()
          }}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            boxShadow: theme.shadows[8]
          }}
        >
          <AIIcon />
        </Fab>
      )}

      {/* Desktop Floating Interface (when open) */}
      <AnimatePresence>
        {!isMobile && isOpen && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            sx={{
              position: 'fixed',
              bottom: isMaximized ? 0 : 24,
              right: isMaximized ? 0 : 24,
              top: isMaximized ? '64px' : 'auto', // Account for header height
              left: isMaximized ? 0 : 'auto',
              zIndex: 1000,
              width: isMaximized ? '100vw' : 400,
              height: isMaximized ? 'calc(100vh - 64px)' : 'auto', // Subtract header height
              maxHeight: isMaximized ? 'calc(100vh - 64px)' : 600
            }}
          >
          <Paper
            elevation={8}
            sx={{
              borderRadius: isMaximized ? 0 : 3,
              overflow: 'hidden',
              background: darkMode ? 'rgba(30, 39, 46, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
              height: isMaximized ? 'calc(100vh - 64px)' : 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <Box
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: 'white',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}
            >
              {/* Main Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                    <AIIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    YourRoute AI
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <IconButton
                    size="small"
                    onClick={handleRefreshChat}
                    sx={{ color: 'white' }}
                    title="Refresh Chat"
                  >
                    <RefreshIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setShowHistory(!showHistory)}
                    sx={{ color: 'white' }}
                    title="Chat History"
                  >
                    <HistoryIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setShowPreferences(true)}
                    sx={{ color: 'white' }}
                    title="Settings"
                  >
                    <SettingsIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={toggleMaximize}
                    sx={{ color: 'white' }}
                    title={isMaximized ? 'Exit Fullscreen' : 'Fullscreen'}
                  >
                    {isMaximized ? <FullscreenExitIcon /> : <FullscreenIcon />}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={closeAITripPlanner}
                    sx={{ color: 'white' }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              
              {/* Development Status Indicator */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                bgcolor: 'rgba(255, 193, 7, 0.2)', 
                borderRadius: 1, 
                p: 0.5,
                border: '1px solid rgba(255, 193, 7, 0.3)'
              }}>
                <WarningIcon sx={{ fontSize: 16, color: '#FFC107' }} />
                <Typography variant="caption" sx={{ color: '#FFC107', fontWeight: 'medium' }}>
                  Powered by n8n • In Development
                </Typography>
                <BuildIcon sx={{ fontSize: 16, color: '#FFC107' }} />
              </Box>
            </Box>

            {/* Chat Interface with History Sidebar */}
            <Box sx={{ 
              flex: 1, 
              overflow: 'hidden', 
              display: 'flex',
              minHeight: isMaximized ? 'calc(100vh - 200px)' : 300
            }}>
              {/* Chat History Sidebar */}
              <AnimatePresence>
                {showHistory && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 280, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box sx={{
                      width: 280,
                      height: '100%',
                      borderRight: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                      background: darkMode ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      {/* History Header */}
                      <Box sx={{
                        p: 2,
                        borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Chat History
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => setShowHistory(false)}
                          sx={{ color: 'text.secondary' }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>

                      {/* History List */}
                      <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
                        {chatHistory.length === 0 ? (
                          <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              No saved chats yet
                            </Typography>
                          </Box>
                        ) : (
                          chatHistory.map((chat) => (
                            <Box
                              key={chat.id}
                              onClick={() => handleLoadChat(chat)}
                              sx={{
                                p: 1.5,
                                mb: 1,
                                borderRadius: 1,
                                cursor: 'pointer',
                                background: currentChatId === chat.id 
                                  ? 'primary.main' 
                                  : 'transparent',
                                color: currentChatId === chat.id ? 'white' : 'text.primary',
                                '&:hover': {
                                  background: currentChatId === chat.id 
                                    ? 'primary.dark' 
                                    : darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                                },
                                transition: 'all 0.2s ease'
                              }}
                            >
                              <Typography variant="body2" fontWeight="medium" noWrap>
                                {chat.title}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                {new Date(chat.timestamp).toLocaleDateString()} • {chat.messages.length} messages
                              </Typography>
                            </Box>
                          ))
                        )}
                      </Box>

                      {/* History Actions */}
                      <Box sx={{
                        p: 1,
                        borderTop: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
                      }}>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          onClick={handleNewChat}
                          startIcon={<HistoryIcon />}
                          sx={{ mb: 1 }}
                        >
                          New Chat
                        </Button>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          onClick={handleSaveChat}
                          startIcon={<SaveIcon />}
                          disabled={messages.length <= 1}
                        >
                          Save Current
                        </Button>
                      </Box>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Chat Interface */}
              <Box sx={{ 
                flex: 1, 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column'
              }}>
                <ChatInterface
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  quickActions={quickActions}
                  isMaximized={isMaximized}
                  onOpenPreferences={() => setShowPreferences(true)}
                  onClearChat={handleClearChat}
                />
              </Box>
            </Box>

            {/* Suggested Routes */}
            <AnimatePresence>
              {suggestedRoutes.length > 0 && (
                <Box sx={{ 
                  p: 2, 
                  maxHeight: isMaximized ? '25vh' : 180, 
                  minHeight: isMaximized ? '150px' : 120,
                  overflow: 'auto',
                  borderTop: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  background: darkMode ? 'rgba(0, 0, 0, 0.02)' : 'rgba(0, 0, 0, 0.01)'
                }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 'medium' }}>
                    Suggested Routes
                  </Typography>
                  {suggestedRoutes.map((route, index) => (
                    <RouteCard
                      key={route.id}
                      route={route}
                      onSelect={() => handleRouteSelect(route)}
                      index={index}
                    />
                  ))}
                </Box>
              )}
            </AnimatePresence>
          </Paper>
        </Box>
        )}
      </AnimatePresence>

      {/* Mobile Full-Screen Dialog */}
      <Dialog
        fullScreen
        open={isOpen && isMobile}
        onClose={closeAITripPlanner}
        TransitionComponent={Transition}
      >
        <DialogTitle
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            p: 2
          }}
        >
          {/* Main Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                <AIIcon />
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                YourRoute AI
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton
                size="small"
                onClick={handleRefreshChat}
                sx={{ color: 'white' }}
                title="Refresh Chat"
              >
                <RefreshIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => setShowHistory(!showHistory)}
                sx={{ color: 'white' }}
                title="Chat History"
              >
                <HistoryIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => setShowPreferences(true)}
                sx={{ color: 'white' }}
                title="Settings"
              >
                <SettingsIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={closeAITripPlanner}
                sx={{ color: 'white' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          
          {/* Development Status Indicator */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            bgcolor: 'rgba(255, 193, 7, 0.2)', 
            borderRadius: 1, 
            p: 0.5,
            border: '1px solid rgba(255, 193, 7, 0.3)'
          }}>
            <WarningIcon sx={{ fontSize: 16, color: '#FFC107' }} />
            <Typography variant="caption" sx={{ color: '#FFC107', fontWeight: 'medium' }}>
              Powered by n8n • In Development
            </Typography>
            <BuildIcon sx={{ fontSize: 16, color: '#FFC107' }} />
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ 
          p: 0, 
          display: 'flex', 
          flexDirection: 'column',
          height: 'calc(100vh - 120px)', // Account for dialog title height
          overflow: 'hidden'
        }}>
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            quickActions={quickActions}
            isMobile={true}
            onOpenPreferences={() => setShowPreferences(true)}
            onClearChat={handleClearChat}
          />
          
          <AnimatePresence>
            {suggestedRoutes.length > 0 && (
              <Box sx={{ 
                p: 2, 
                maxHeight: '30vh',
                minHeight: '120px',
                overflow: 'auto',
                borderTop: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                background: darkMode ? 'rgba(0, 0, 0, 0.02)' : 'rgba(0, 0, 0, 0.01)'
              }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 'medium' }}>
                  Suggested Routes
                </Typography>
                {suggestedRoutes.map((route, index) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                    onSelect={() => handleRouteSelect(route)}
                    index={index}
                  />
                ))}
              </Box>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      {/* Preferences Modal */}
      <PreferencesModal
        open={showPreferences}
        onClose={() => setShowPreferences(false)}
        preferences={userPreferences}
        onUpdate={handlePreferencesUpdate}
      />
    </>
  )
} 