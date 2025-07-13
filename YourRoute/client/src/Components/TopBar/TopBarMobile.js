import React, {useContext} from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
  IconButton,
  Button,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {AnimatePresence, motion} from 'framer-motion'
import './topbar.css'
import AppContext from '../../appContext'
import { useAITripPlanner } from '../../aiTripPlannerContext'

import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import MapIcon from '@mui/icons-material/Map'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import PersonIcon from '@mui/icons-material/Person'

const MotionBox = motion(Box)
const MotionTypography = motion(Typography)

export default function MobileTopBar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const navigate = useNavigate()
  const theme = useTheme()
  const {darkMode, setDarkMode} = useContext(AppContext)
  const { openAITripPlanner } = useAITripPlanner()

  const handleMenuToggle = () => {
    setIsOpen(!isOpen)
  }

  const handlePageChange = (path) => {
    setIsOpen(false)
    navigate(path)
  }

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

          <IconButton
            onClick={handleDarkModeToggle}
            color="inherit"
            sx={{
              marginRight: 7,
            }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <div
            className="container"
            onClick={handleMenuToggle}
            style={{
              position: 'fixed',
              right: theme.spacing(2),
              top: theme.spacing(1),
              zIndex: theme.zIndex.drawer + 2,
            }}
          >
            <div className={`burger ${isOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <AnimatePresence>
        {isOpen && (
          <MotionBox
            initial={{height: 0, opacity: 0}}
            animate={{height: '100vh', opacity: 1}}
            exit={{height: 0, opacity: 0}}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 30,
            }}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: theme.palette.primary.main,
              zIndex: (theme) => theme.zIndex.drawer,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: 3,
                p: 2,
              }}
            >
              {/* Live Map Button */}
              <motion.div
                initial={{x: -100, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                exit={{x: -100, opacity: 0}}
                transition={{
                  delay: 0.1,
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 80,
                }}
              >
                <Button
                  onClick={() => handlePageChange('/map')}
                  variant="contained"
                  startIcon={<MapIcon />}
                  fullWidth
                  sx={{
                    background: 'linear-gradient(135deg, #1976d2, #43cea2)',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '25px',
                    py: 2,
                    px: 4,
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
              </motion.div>

              {/* AI Agent Button */}
              <motion.div
                initial={{x: -100, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                exit={{x: -100, opacity: 0}}
                transition={{
                  delay: 0.2,
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 80,
                }}
              >
                <Button
                  onClick={() => {
                    openAITripPlanner()
                    handlePageChange('/')
                  }}
                  variant="outlined"
                  startIcon={<SmartToyIcon />}
                  fullWidth
                  sx={{
                    borderColor: '#43cea2',
                    color: '#43cea2',
                    fontWeight: 'bold',
                    borderRadius: '25px',
                    py: 2,
                    px: 4,
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
              </motion.div>

              {/* Login Button */}
              <motion.div
                initial={{x: -100, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                exit={{x: -100, opacity: 0}}
                transition={{
                  delay: 0.3,
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 80,
                }}
              >
                <Button
                  onClick={() => {
                    console.log('Login clicked')
                    handlePageChange('/')
                  }}
                  variant="text"
                  startIcon={<PersonIcon />}
                  fullWidth
                  sx={{
                    color: 'text.primary',
                    fontWeight: 'bold',
                    borderRadius: '25px',
                    py: 2,
                    px: 4,
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Login
                </Button>
              </motion.div>

              {/* Divider */}
              <Box sx={{ width: '80%', height: '1px', bgcolor: 'rgba(255,255,255,0.2)', my: 2 }} />

              {/* Existing Navigation */}
              <MotionTypography
                initial={{x: -100, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                exit={{x: -100, opacity: 0}}
                transition={{
                  delay: 0.4,
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 80,
                }}
                variant="h6"
                color="text.primary"
                onClick={() => handlePageChange('/about')}
                sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
              >
                About
              </MotionTypography>
              <MotionTypography
                initial={{x: -100, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                exit={{x: -100, opacity: 0}}
                transition={{
                  delay: 0.5,
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 80,
                }}
                variant="h6"
                color="text.primary"
                onClick={() => handlePageChange('/timeline')}
                sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
              >
                Timeline
              </MotionTypography>
              <MotionTypography
                initial={{x: -100, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                exit={{x: -100, opacity: 0}}
                transition={{
                  delay: 0.6,
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 80,
                }}
                variant="h6"
                color="text.primary"
                onClick={() => handlePageChange('/contact')}
                sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
              >
                Contact
              </MotionTypography>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  )
}
