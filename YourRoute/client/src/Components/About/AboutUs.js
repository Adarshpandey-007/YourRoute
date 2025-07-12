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
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import AppContext from '../../appContext'
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

export default function About() {
  const {darkMode} = useContext(AppContext)
  const [scrollY, setScrollY] = useState(0)

  // Use a light color illustration for the background
  const illustration = '/background/about.png'

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        p: 4,
        flexDirection: 'column',
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
          YourRoute is a modern web application designed to help commuters visualize and track public transportation in real time. Our mission is to empower city travelers with live locations, estimated arrivals, and smart route planning—all on an interactive, beautiful map.
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
        Slug Loop provides UCSC campus bus locations in real time.
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
      <Paper
        sx={{
          p: 2,
          mb: 2,
          bgcolor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.7)',
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          mb={1}
          color="text.primary"
        >
          Our project stands on the shoulders of giants. Many thanks to:
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          mb={2}
          color="text.secondary"
        >
          • Professor Kerry Veenstra
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          mb={2}
          color="text.secondary"
        >
          • Santa Cruz Metro
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          mb={2}
          color="text.secondary"
        >
          • UCSC TAPS
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          mb={2}
          color="text.secondary"
        >
          • Past Contributors of BTS 2 and 3
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          mb={2}
          color="text.secondary"
        >
          • PinPoint Team
        </Typography>
      </Paper>
      {/* Features Section */}
      <Box width="100%" mb={4}>
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
        </Grid>
        {/* Advanced Features - Added for mobile parity with desktop */}
        <Grid container spacing={4} justifyContent="center" mt={1}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#1976d2"><span role="img" aria-label="calendar">📅</span></Box>
              <Typography variant="h6" fontWeight="bold">Calendar Integration</Typography>
              <Typography variant="body2" color="text.secondary">Sync your transit plans with your calendar for seamless scheduling.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#43cea2"><span role="img" aria-label="money">💸</span></Box>
              <Typography variant="h6" fontWeight="bold">Fare Calculator</Typography>
              <Typography variant="body2" color="text.secondary">Estimate your trip cost instantly with our built-in fare calculator.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#1976d2"><span role="img" aria-label="language">🌐</span></Box>
              <Typography variant="h6" fontWeight="bold">Multi-Language Support</Typography>
              <Typography variant="body2" color="text.secondary">Use YourRoute in your preferred language for a global experience.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#43cea2"><span role="img" aria-label="feedback">💬</span></Box>
              <Typography variant="h6" fontWeight="bold">Feedback & Support</Typography>
              <Typography variant="body2" color="text.secondary">Easily send feedback or get help directly from the app.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#1976d2"><span role="img" aria-label="cluster">🗂️</span></Box>
              <Typography variant="h6" fontWeight="bold">Map Clustering</Typography>
              <Typography variant="body2" color="text.secondary">Efficiently view dense areas with automatic stop clustering on the map.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#43cea2"><span role="img" aria-label="location">📍</span></Box>
              <Typography variant="h6" fontWeight="bold">Nearby Places</Typography>
              <Typography variant="body2" color="text.secondary">Discover cafes, ATMs, and other amenities near your stops.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 3, textAlign: 'center', borderRadius: 4, bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'white', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 12 } }}>
              <Box mb={1} color="#1976d2"><span role="img" aria-label="api">🔗</span></Box>
              <Typography variant="h6" fontWeight="bold">Developer API</Typography>
              <Typography variant="body2" color="text.secondary">Integrate YourRoute data into your own apps with our public API.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      {/* CTA Section */}
      <Box width="100%" mt={4} mb={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Paper elevation={8} sx={{
          p: 4,
          borderRadius: 4,
          width: { xs: '100%', sm: '80%', md: '60%' },
          textAlign: 'center',
          background: 'linear-gradient(120deg, #1976d2 60%, #43cea2 100%)',
          color: 'white',
          boxShadow: 6,
        }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Ready to experience the future of public transit?
          </Typography>
          <Typography variant="subtitle1" mb={3}>
            Try YourRoute now and make your commute smarter, simpler, and more enjoyable!
          </Typography>
          <Box mt={2}>
            <a href="/" style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'inline-block',
                  px: 4,
                  py: 1.5,
                  bgcolor: 'white',
                  color: '#1976d2',
                  borderRadius: 3,
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  boxShadow: 3,
                  transition: 'background 0.2s, color 0.2s',
                  '&:hover': {
                    bgcolor: '#43cea2',
                    color: 'white',
                  },
                }}
              >
                Get Started
              </Box>
            </a>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}
