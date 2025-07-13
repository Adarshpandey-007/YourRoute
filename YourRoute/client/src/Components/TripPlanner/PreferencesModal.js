import React, { useState, useContext } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormControlLabel,
  Switch,
  Divider,
  Chip,
  Avatar
} from '@mui/material'
import {
  DirectionsWalk as WalkIcon,
  DirectionsBus as BusIcon,
  DirectionsSubway as MetroIcon,
  DirectionsBike as BikeIcon,
  Accessibility as AccessibilityIcon,
  Speed as SpeedIcon
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import AppContext from '../../appContext'

export default function PreferencesModal({ open, onClose, preferences, onUpdate }) {
  const { darkMode } = useContext(AppContext)
  const [localPreferences, setLocalPreferences] = useState(preferences)

  const handleSave = () => {
    onUpdate(localPreferences)
  }

  const handleCancel = () => {
    setLocalPreferences(preferences)
    onClose()
  }

  const transportModes = [
    { value: 'any', label: 'Any Mode', icon: <SpeedIcon /> },
    { value: 'metro', label: 'Metro Only', icon: <MetroIcon /> },
    { value: 'bus', label: 'Bus Only', icon: <BusIcon /> },
    { value: 'walk', label: 'Walking', icon: <WalkIcon /> },
    { value: 'bike', label: 'Bicycle', icon: <BikeIcon /> }
  ]

  const accessibilityOptions = [
    { value: 'elevator', label: 'Elevator Access', icon: '🛗' },
    { value: 'ramp', label: 'Ramp Access', icon: '♿' },
    { value: 'lowFloor', label: 'Low Floor Buses', icon: '🚌' },
    { value: 'audio', label: 'Audio Announcements', icon: '🔊' }
  ]

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: darkMode ? 'rgba(30, 39, 46, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)'
        }
      }}
    >
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${darkMode ? '#003c71' : '#1f78b4'}, ${darkMode ? '#ffc72c' : '#ffcc00'})`,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
          <AccessibilityIcon />
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          Trip Preferences
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Preferred Transport Mode */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
              Preferred Transport Mode
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Transport Mode</InputLabel>
              <Select
                value={localPreferences.preferredMode}
                onChange={(e) => setLocalPreferences(prev => ({
                  ...prev,
                  preferredMode: e.target.value
                }))}
                label="Transport Mode"
              >
                {transportModes.map((mode) => (
                  <MenuItem key={mode.value} value={mode.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {mode.icon}
                      {mode.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Maximum Walking Distance */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
              Maximum Walking Distance
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={localPreferences.maxWalkDistance}
                onChange={(e, value) => setLocalPreferences(prev => ({
                  ...prev,
                  maxWalkDistance: value
                }))}
                min={100}
                max={2000}
                step={100}
                marks={[
                  { value: 100, label: '100m' },
                  { value: 500, label: '500m' },
                  { value: 1000, label: '1km' },
                  { value: 2000, label: '2km' }
                ]}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}m`}
                sx={{
                  '& .MuiSlider-track': {
                    background: `linear-gradient(90deg, ${darkMode ? '#ffc72c' : '#ffcc00'}, ${darkMode ? '#003c71' : '#1f78b4'})`
                  },
                  '& .MuiSlider-thumb': {
                    bgcolor: darkMode ? '#ffc72c' : '#ffcc00'
                  }
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" align="center">
              {localPreferences.maxWalkDistance}m maximum walking distance
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Accessibility Options */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
              Accessibility Options
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={localPreferences.accessibility}
                  onChange={(e) => setLocalPreferences(prev => ({
                    ...prev,
                    accessibility: e.target.checked
                  }))}
                  color="primary"
                />
              }
              label="Enable accessibility features"
              sx={{ mb: 2 }}
            />

            {localPreferences.accessibility && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {accessibilityOptions.map((option) => (
                    <Chip
                      key={option.value}
                      label={option.label}
                      icon={<span>{option.icon}</span>}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                        color: 'text.primary'
                      }}
                    />
                  ))}
                </Box>
              </motion.div>
            )}

            <FormControlLabel
              control={
                <Switch
                  checked={localPreferences.avoidStairs}
                  onChange={(e) => setLocalPreferences(prev => ({
                    ...prev,
                    avoidStairs: e.target.checked
                  }))}
                  color="primary"
                />
              }
              label="Avoid stairs and escalators"
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Additional Preferences */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
              Additional Preferences
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={localPreferences.preferDirect}
                    onChange={(e) => setLocalPreferences(prev => ({
                      ...prev,
                      preferDirect: e.target.checked
                    }))}
                    color="primary"
                  />
                }
                label="Prefer direct routes over faster routes"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={localPreferences.avoidCrowded}
                    onChange={(e) => setLocalPreferences(prev => ({
                      ...prev,
                      avoidCrowded: e.target.checked
                    }))}
                    color="primary"
                  />
                }
                label="Avoid crowded vehicles when possible"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={localPreferences.realTimeUpdates}
                    onChange={(e) => setLocalPreferences(prev => ({
                      ...prev,
                      realTimeUpdates: e.target.checked
                    }))}
                    color="primary"
                  />
                }
                label="Enable real-time updates and notifications"
              />
            </Box>
          </Box>
        </motion.div>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleCancel} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            background: `linear-gradient(135deg, ${darkMode ? '#003c71' : '#1f78b4'}, ${darkMode ? '#ffc72c' : '#ffcc00'})`,
            '&:hover': {
              background: `linear-gradient(135deg, ${darkMode ? '#002a5a' : '#1565c0'}, ${darkMode ? '#e6b800' : '#f57c00'})`
            }
          }}
        >
          Save Preferences
        </Button>
      </DialogActions>
    </Dialog>
  )
} 