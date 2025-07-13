import React, { useState, useRef, useEffect, useContext } from 'react'
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
  Paper
} from '@mui/material'
import {
  Send as SendIcon,
  SmartToy as AIIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Warning as WarningIcon,
  Build as BuildIcon,
  Clear as ClearIcon
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import AppContext from '../../appContext'

export default function ChatInterface({ 
  messages, 
  onSendMessage, 
  isLoading, 
  quickActions, 
  isMobile = false,
  isMaximized = false,
  onOpenPreferences,
  onClearChat
}) {
  const { darkMode } = useContext(AppContext)
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim())
      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }



  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: isMobile ? '100%' : isMaximized ? 'calc(100vh - 64px)' : 400,
        maxHeight: isMobile ? '100%' : isMaximized ? 'calc(100vh - 64px)' : 400
      }}
    >
      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxHeight: isMaximized ? 'calc(100vh - 280px)' : 'auto',
          minHeight: isMaximized ? '400px' : '200px'
        }}
      >
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start'
                }}
              >
                {message.type === 'ai' && (
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: isMaximized ? 36 : 32,
                      height: isMaximized ? 36 : 32,
                      mt: 0.5
                    }}
                  >
                    <AIIcon fontSize={isMaximized ? "medium" : "small"} />
                  </Avatar>
                )}
                
                <Box
                  sx={{
                    maxWidth: isMaximized ? '60%' : '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5
                  }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: isMaximized ? 2 : 1.5,
                      borderRadius: 2,
                      background: message.type === 'user' 
                        ? 'primary.main' 
                        : darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                      color: message.type === 'user' ? 'white' : 'text.primary',
                      borderTopLeftRadius: message.type === 'ai' ? 4 : 12,
                      borderTopRightRadius: message.type === 'user' ? 4 : 12,
                      wordBreak: 'break-word',
                      fontSize: isMaximized ? '0.9rem' : '0.875rem'
                    }}
                  >
                    <Typography variant="body2" sx={{ fontSize: 'inherit' }}>
                      {message.content}
                    </Typography>
                  </Paper>
                  
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontSize: '0.7rem',
                      alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    {formatTime(message.timestamp)}
                  </Typography>
                </Box>

                {message.type === 'user' && (
                  <Avatar
                    sx={{
                      bgcolor: 'secondary.main',
                      width: isMaximized ? 36 : 32,
                      height: isMaximized ? 36 : 32,
                      mt: 0.5
                    }}
                  >
                    <PersonIcon fontSize={isMaximized ? "medium" : "small"} />
                  </Avatar>
                )}
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'flex-start'
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: isMaximized ? 36 : 32,
                  height: isMaximized ? 36 : 32,
                  mt: 0.5
                }}
              >
                <AIIcon fontSize={isMaximized ? "medium" : "small"} />
              </Avatar>
              
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1.5,
                  borderRadius: 2,
                  background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                }}
              >
                <CircularProgress size={16} />
                <Typography variant="body2" color="text.secondary">
                  AI is thinking... (n8n workflow processing)
                </Typography>
              </Box>
            </Box>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* Quick Actions */}
      {quickActions && quickActions.length > 0 && (
        <Box sx={{ 
          p: 2, 
          pt: 1,
          pb: 1,
          borderTop: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
          background: darkMode ? 'rgba(0, 0, 0, 0.02)' : 'rgba(0, 0, 0, 0.01)'
        }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block', fontWeight: 'medium' }}>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {quickActions.map((action, index) => (
              <Chip
                key={index}
                label={action.label}
                icon={action.icon}
                onClick={action.action}
                size="small"
                variant="outlined"
                sx={{
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white'
                  }
                }}
              />
            ))}
            {onOpenPreferences && (
              <Chip
                label="Preferences"
                icon={<SettingsIcon />}
                onClick={onOpenPreferences}
                size="small"
                variant="outlined"
                sx={{
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  '&:hover': {
                    bgcolor: 'secondary.main',
                    color: 'white'
                  }
                }}
              />
            )}
            {onClearChat && messages.length > 1 && (
              <Chip
                label="Clear Chat"
                icon={<ClearIcon />}
                onClick={onClearChat}
                size="small"
                variant="outlined"
                sx={{
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  '&:hover': {
                    bgcolor: 'error.main',
                    color: 'white'
                  }
                }}
              />
            )}
          </Box>
        </Box>
      )}

      {/* Development Status Indicator */}
      <Box sx={{ 
        p: 1, 
        bgcolor: 'rgba(255, 193, 7, 0.1)', 
        borderTop: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 1,
        minHeight: '32px'
      }}>
        <WarningIcon sx={{ fontSize: 14, color: '#FFC107' }} />
        <Typography variant="caption" sx={{ color: '#FFC107', fontWeight: 'medium', textAlign: 'center', fontSize: '0.7rem' }}>
          Powered by n8n • Platform in Development
        </Typography>
        <BuildIcon sx={{ fontSize: 14, color: '#FFC107' }} />
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          p: 2,
          pt: 1,
          borderTop: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          background: darkMode ? 'rgba(30, 39, 46, 0.5)' : 'rgba(255, 255, 255, 0.5)',
          minHeight: '80px'
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            ref={inputRef}
            fullWidth
            multiline
            maxRows={3}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about routes, stops, or anything transit-related... (Development Mode)"
            variant="outlined"
            size="small"
            disabled={isLoading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                }
              }
            }}
          />
          <IconButton
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            color="primary"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark'
              },
              '&.Mui-disabled': {
                bgcolor: 'action.disabledBackground',
                color: 'action.disabled'
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
        
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', fontSize: '0.65rem' }}>
          Press Enter to send, Shift+Enter for new line • Powered by n8n workflow
        </Typography>
      </Box>
    </Box>
  )
} 