import React, {useContext} from 'react'
import {Box, Stack, Typography, ListItemIcon} from '@mui/material'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import TrainIcon from '@mui/icons-material/Train'
import AppContext from '../../appContext'
import GetAppIcon from '@mui/icons-material/GetApp'

export default function FeaturesDesktop() {
  const {darkMode} = useContext(AppContext)
  return (
    <Box
      width="100%"
      height="100vh"
      sx={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        width="100%"
        height="100vh"
        sx={{
          backgroundImage: 'url(background/featureDesktop.png)',
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

      <Stack
        width="80%"
        direction="row"
        spacing={5}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          height="350px"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          padding={4}
          sx={{
            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <Stack direction="column" alignItems="center" spacing={2} sx={{ height: '100%', justifyContent: 'space-between' }}>
            <Box sx={{ textAlign: 'center' }}>
              <ListItemIcon sx={{ mb: 2 }}>
                <DirectionsBusIcon color="secondary" fontSize="large" />
              </ListItemIcon>
              <Typography variant="h5" color="text.primary" align="center" fontWeight="bold" mb={2}>
                Real-Time Transit Tracking
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center" lineHeight={1.6}>
                Experience the power of live transit data with YourRoute. Track buses and metros in real-time with precise location updates, route information, and estimated arrival times. Our advanced tracking system eliminates guesswork and keeps you informed about your journey every step of the way.
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box
          height="350px"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          padding={4}
          sx={{
            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <Stack direction="column" alignItems="center" spacing={2} sx={{ height: '100%', justifyContent: 'space-between' }}>
            <Box sx={{ textAlign: 'center' }}>
              <ListItemIcon sx={{ mb: 2 }}>
                <TrainIcon color="secondary" fontSize="large" />
              </ListItemIcon>
              <Typography variant="h5" color="text.primary" align="center" fontWeight="bold" mb={2}>
                AI-Powered Route Planning
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center" lineHeight={1.6}>
                Leverage the power of artificial intelligence with our smart route planning system. YourRoute analyzes real-time data, traffic conditions, and historical patterns to provide optimal route suggestions, intelligent ETA predictions, and dynamic rerouting when delays occur.
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box
          height="350px"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          padding={4}
          sx={{
            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <Stack direction="column" alignItems="center" spacing={2} sx={{ height: '100%', justifyContent: 'space-between' }}>
            <Box sx={{ textAlign: 'center' }}>
              <ListItemIcon sx={{ mb: 2 }}>
                <GetAppIcon color="secondary" fontSize="large" />
              </ListItemIcon>
              <Typography variant="h5" color="text.primary" align="center" fontWeight="bold" mb={2}>
                Cross-Platform Experience
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center" lineHeight={1.6}>
                Enjoy YourRoute seamlessly across all devices. Install as a Progressive Web App for native-like experience, access offline capabilities, and benefit from push notifications. Our responsive design ensures perfect functionality on desktop, tablet, and mobile devices.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
