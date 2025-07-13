import React, {useContext} from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Button,
  Box,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'

import AppContext from '../../appContext'
import { useAITripPlanner } from '../../aiTripPlannerContext'

import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import MapIcon from '@mui/icons-material/Map'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import PersonIcon from '@mui/icons-material/Person'

export default function DesktopTopBar() {
  const navigate = useNavigate()

  const {darkMode, setDarkMode} = useContext(AppContext)
  const { openAITripPlanner } = useAITripPlanner()

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode)
  }

  return (
    <>
      <AppBar
        position="sticky"
        sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
      >
        <Toolbar>
          <Typography
            variant="h6"
            onClick={() => navigate('/')}
            style={{flexGrow: 1, cursor: 'pointer'}}
            color="text.primary"
          >
            YourRoute
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
          >
            {/* Live Map Button */}
            <Button
              onClick={() => navigate('/map')}
              variant="contained"
              startIcon={<MapIcon />}
              sx={{
                background: 'linear-gradient(135deg, #1976d2, #43cea2)',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '25px',
                px: 3,
                py: 1,
                boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0, #2e7d32)',
                  boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Live Map
            </Button>

            {/* AI Agent Button */}
            <Button
              onClick={openAITripPlanner}
              variant="outlined"
              startIcon={<SmartToyIcon />}
              sx={{
                borderColor: '#43cea2',
                color: '#43cea2',
                fontWeight: 'bold',
                borderRadius: '25px',
                px: 3,
                py: 1,
                borderWidth: 2,
                '&:hover': {
                  borderColor: '#2e7d32',
                  color: '#2e7d32',
                  backgroundColor: 'rgba(67, 206, 162, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              AI Agent
            </Button>

            {/* Login/Signup Button */}
            <Button
              onClick={() => {
                // Add login/signup logic here
                console.log('Login/Signup clicked')
              }}
              variant="text"
              startIcon={<PersonIcon />}
              sx={{
                color: 'text.primary',
                fontWeight: 'bold',
                borderRadius: '25px',
                px: 3,
                py: 1,
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Login
            </Button>

            {/* Existing Navigation Buttons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                onClick={() => navigate('/about')}
                variant="text"
                color="secondary"
                sx={{ fontWeight: 'medium' }}
              >
                About
              </Button>
              <Button
                onClick={() => navigate('/timeline')}
                variant="text"
                color="secondary"
                sx={{ fontWeight: 'medium' }}
              >
                Timeline
              </Button>
              <Button
                onClick={() => navigate('/contact')}
                variant="text"
                color="secondary"
                sx={{ fontWeight: 'medium' }}
              >
                Contact
              </Button>
            </Box>

            <IconButton 
              onClick={handleDarkModeToggle} 
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  )
}
