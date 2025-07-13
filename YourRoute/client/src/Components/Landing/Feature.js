import React, {useContext} from 'react'
import {Box, Stack, Typography, ListItemIcon} from '@mui/material'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import TrainIcon from '@mui/icons-material/Train'
import GetAppIcon from '@mui/icons-material/GetApp'
import AppContext from '../../appContext'

export default function Features() {
  const {darkMode} = useContext(AppContext)
  return (
    <Box
      component="section"
      width="100vw"
      height="100vh"
      sx={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Box
        width="100vw"
        height="100vh"
        sx={{
          backgroundImage: 'url(background/buses.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
          position: 'absolute',
          zIndex: -1,

          filter: darkMode ? 'brightness(0.5)' : 'brightness(1)',
          '::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: darkMode ? 'none' : 'rgba(255, 255, 255, 0.4)',
          },
        }}
      />
      <Typography
        variant="h4"
        align="center"
        color="text.primary"
        sx={{
          paddingTop: '20vh',
        }}
      >
        Features:
      </Typography>
      <Stack
        width="80%"
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="flex-start"
        sx={{
          paddingTop: '5vh',
        }}
      >
        <Box
          sx={{
            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
            borderRadius: '15px',
            p: 3,
            width: '100%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <ListItemIcon>
              <DirectionsBusIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <Box>
              <Typography variant="h6" color="text.primary" fontWeight="bold" mb={1}>
                Real-Time Transit Tracking
              </Typography>
              <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                Experience the power of live transit data with YourRoute. Track buses and metros in real-time with precise location updates, route information, and estimated arrival times. Our advanced tracking system eliminates guesswork and keeps you informed about your journey every step of the way.
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
            borderRadius: '15px',
            p: 3,
            width: '100%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <ListItemIcon>
              <TrainIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <Box>
              <Typography variant="h6" color="text.primary" fontWeight="bold" mb={1}>
                AI-Powered Route Planning
              </Typography>
              <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                Leverage the power of artificial intelligence with our smart route planning system. YourRoute analyzes real-time data, traffic conditions, and historical patterns to provide optimal route suggestions, intelligent ETA predictions, and dynamic rerouting when delays occur.
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
            borderRadius: '15px',
            p: 3,
            width: '100%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <ListItemIcon>
              <GetAppIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <Box>
              <Typography variant="h6" color="text.primary" fontWeight="bold" mb={1}>
                Cross-Platform Experience
              </Typography>
              <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                Enjoy YourRoute seamlessly across all devices. Install as a Progressive Web App for native-like experience, access offline capabilities, and benefit from push notifications. Our responsive design ensures perfect functionality on desktop, tablet, and mobile devices.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
