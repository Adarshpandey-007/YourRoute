import React, { useContext } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Divider,
  Avatar,
  LinearProgress
} from '@mui/material'
import {
  Directions as DirectionsIcon,
  AccessTime as TimeIcon,
  Straighten as DistanceIcon,
  AttachMoney as CostIcon,
  Accessibility as AccessibilityIcon,
  TrendingUp as TrendingIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import AppContext from '../../appContext'

export default function RouteCard({ route, onSelect, index = 0 }) {
  const { darkMode } = useContext(AppContext)
  const [isFavorite, setIsFavorite] = React.useState(false)

  const getModeIcon = (mode) => {
    const modeIcons = {
      walk: '🚶',
      metro: '🚇',
      bus: '🚌',
      train: '🚆',
      taxi: '🚕',
      bike: '🚲'
    }
    return modeIcons[mode] || '🚌'
  }

  const getModeColor = (mode) => {
    const modeColors = {
      walk: '#4CAF50',
      metro: '#2196F3',
      bus: '#FF9800',
      train: '#9C27B0',
      taxi: '#FF5722',
      bike: '#795548'
    }
    return modeColors[mode] || '#666'
  }

  const getAccessibilityColor = () => {
    return route.accessibility ? '#4CAF50' : '#FF9800'
  }

  const handleFavoriteToggle = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleSelect = () => {
    onSelect(route)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        elevation={2}
        onClick={handleSelect}
        sx={{
          cursor: 'pointer',
          mb: 2,
          borderRadius: 2,
          background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            elevation: 4,
            transform: 'translateY(-2px)',
            boxShadow: theme => theme.shadows[8]
          }
        }}
      >
        <CardContent sx={{ p: 2 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 0.5 }}>
                {route.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Chip
                  label={route.mode}
                  size="small"
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
                {route.accessibility && (
                  <Chip
                    icon={<AccessibilityIcon />}
                    label="Accessible"
                    size="small"
                    sx={{
                      bgcolor: getAccessibilityColor(),
                      color: 'white',
                      fontSize: '0.7rem'
                    }}
                  />
                )}
              </Box>
            </Box>
            
            <IconButton
              size="small"
              onClick={handleFavoriteToggle}
              sx={{ color: isFavorite ? 'error.main' : 'text.secondary' }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>

          {/* Route Stats */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TimeIcon fontSize="small" color="primary" />
              <Typography variant="body2" color="text.primary" fontWeight="medium">
                {route.duration}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <DistanceIcon fontSize="small" color="primary" />
              <Typography variant="body2" color="text.primary" fontWeight="medium">
                {route.distance}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CostIcon fontSize="small" color="primary" />
              <Typography variant="body2" color="text.primary" fontWeight="medium">
                {route.cost}
              </Typography>
            </Box>
          </Box>

          {/* Route Steps */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Route Details
            </Typography>
            {route.steps.map((step, stepIndex) => (
              <Box
                key={stepIndex}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1,
                  p: 1,
                  borderRadius: 1,
                  background: darkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'
                }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: '0.8rem',
                    bgcolor: getModeColor(step.mode)
                  }}
                >
                  {getModeIcon(step.mode)}
                </Avatar>
                
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.primary">
                    {step.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {step.duration}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Efficiency Indicator */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Route Efficiency
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingIcon fontSize="small" color="success" />
                <Typography variant="caption" color="success.main" fontWeight="medium">
                  Optimal
                </Typography>
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={85}
              sx={{
                height: 4,
                borderRadius: 2,
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 2,
                  background: 'linear-gradient(90deg, #4CAF50, #8BC34A)'
                }
              }}
            />
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Action Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Click to view on map
            </Typography>
            <IconButton
              size="small"
              onClick={handleSelect}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              <DirectionsIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  )
} 