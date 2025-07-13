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
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Divider,
  Badge,
  Tooltip,
  Fade,
  Zoom,
  Slide,
} from '@mui/material'
import {
  LinkedIn as LinkedInIcon,
  ExpandMore as ExpandMoreIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Accessibility as AccessibilityIcon,
  Psychology as PsychologyIcon,
  Timeline as TimelineIcon,
  Code as CodeIcon,
  Public as PublicIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import AppContext from '../../appContext'
const team = [
  {
    name: 'Adarsh Pandey',
    email: 'adarsh.pandey@email.com',
    role: 'Full Stack Developer',
    img: '/about/adarsh.jpg',
    linkedin: 'https://www.linkedin.com/in/adarsh-pandey/',
    github: 'https://github.com/adarshpandey',
    skills: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS'],
    experience: '3+ years',
    education: 'B.Tech Computer Science',
    achievements: ['Code For Bharat Winner', 'Hackathon Champion', 'Open Source Contributor'],
    bio: 'Passionate full-stack developer with expertise in modern web technologies and AI integration.',
  },
  {
    name: 'Jiya Bhati',
    email: 'jiya.bhati@email.com',
    role: 'Frontend Developer',
    img: '/about/jiya.jpg',
    linkedin: 'https://www.linkedin.com/in/jiya-bhati/',
    github: 'https://github.com/jiyabhati',
    skills: ['React', 'TypeScript', 'UI/UX', 'Material-UI', 'Framer Motion'],
    experience: '2+ years',
    education: 'B.Tech Information Technology',
    achievements: ['UI/UX Excellence Award', 'Frontend Innovation Prize', 'Community Leader'],
    bio: 'Creative frontend developer focused on creating beautiful, accessible, and performant user experiences.',
  },
]

const features = [
  {
    icon: <TrendingUpIcon />,
    title: 'Real-Time Tracking',
    description: 'Live bus and metro locations with accurate arrival predictions',
    color: '#1976d2'
  },
  {
    icon: <PsychologyIcon />,
    title: 'AI-Powered Planning',
    description: 'Smart route suggestions using machine learning algorithms',
    color: '#43cea2'
  },
  {
    icon: <AccessibilityIcon />,
    title: 'Universal Access',
    description: 'Designed for all users including those with disabilities',
    color: '#ff9800'
  },
  {
    icon: <SecurityIcon />,
    title: 'Privacy First',
    description: 'Your data stays private with end-to-end encryption',
    color: '#f44336'
  },
  {
    icon: <SpeedIcon />,
    title: 'Lightning Fast',
    description: 'Optimized performance for instant loading and updates',
    color: '#9c27b0'
  },
  {
    icon: <PublicIcon />,
    title: 'Global Ready',
    description: 'Multi-language support and worldwide transit integration',
    color: '#00bcd4'
  }
]

const milestones = [
  {
    year: '2024',
    title: 'Code For Bharat Season 2',
    description: 'Won the prestigious hackathon with YourRoute project',
    icon: <TrophyIcon />
  },
  {
    year: '2024',
    title: 'AI Integration',
    description: 'Successfully integrated n8n workflow automation',
    icon: <CodeIcon />
  },
  {
    year: '2024',
    title: 'PWA Launch',
    description: 'Progressive Web App launched with offline capabilities',
    icon: <PublicIcon />
  },
  {
    year: '2024',
    title: 'Delhi Metro Integration',
    description: 'Real-time data integration with Delhi Metro system',
    icon: <TrendingUpIcon />
  }
]

export default function About() {
  const {darkMode} = useContext(AppContext)
  const [scrollY, setScrollY] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const [expandedAccordion, setExpandedAccordion] = useState(false)

  // Use a light color illustration for the background
  const illustration = '/background/about.png'

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false)
  }

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
      {/* Hero Section with Interactive Elements */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
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
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography variant="h2" color="white" fontWeight="bold" mb={2}>
              About YourRoute
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography variant="h5" color="white" mb={2}>
              Making Public Transit Smarter, Simpler, and Real-Time
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography
              variant="subtitle1"
              color="white"
              maxWidth="700px"
              textAlign="center"
              mb={3}
            >
              YourRoute is a modern web application designed to help commuters visualize and track public transportation in real time. Our mission is to empower city travelers with live locations, estimated arrivals, and smart route planning—all on an interactive, beautiful map.
            </Typography>
          </motion.div>
          
          {/* Interactive Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Chip 
                icon={<TrendingUpIcon />} 
                label="Real-Time Data" 
                color="primary" 
                variant="outlined"
                sx={{ color: 'white', borderColor: 'white' }}
              />
              <Chip 
                icon={<PsychologyIcon />} 
                label="AI Powered" 
                color="secondary" 
                variant="outlined"
                sx={{ color: 'white', borderColor: 'white' }}
              />
              <Chip 
                icon={<AccessibilityIcon />} 
                label="Universal Access" 
                color="success" 
                variant="outlined"
                sx={{ color: 'white', borderColor: 'white' }}
              />
            </Box>
          </motion.div>
        </Box>
      </motion.div>
      {/* Interactive Tabs Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Box sx={{ width: '100%', mb: 4 }}>
          <Paper 
            elevation={3} 
            sx={{ 
              borderRadius: 3, 
              overflow: 'hidden',
              bgcolor: darkMode ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.95)',
            }}
          >
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                bgcolor: 'primary.main',
                '& .MuiTab-root': {
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                },
                '& .Mui-selected': {
                  color: 'white',
                },
                '& .MuiTabs-indicator': {
                  bgcolor: 'white',
                  height: 3,
                }
              }}
            >
              <Tab label="Features" />
              <Tab label="Team" />
              <Tab label="Milestones" />
              <Tab label="Technology" />
            </Tabs>

            {/* Features Tab */}
            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h4" textAlign="center" mb={3} color="primary">
                      Why Choose YourRoute?
                    </Typography>
                    <Grid container spacing={3}>
                      {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <Card
                              sx={{
                                p: 2,
                                textAlign: 'center',
                                borderRadius: 3,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateY(-5px)',
                                  boxShadow: 8,
                                },
                                border: `2px solid ${feature.color}`,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: '50%',
                                  bgcolor: feature.color,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 2,
                                  color: 'white',
                                }}
                              >
                                {feature.icon}
                              </Box>
                              <Typography variant="h6" fontWeight="bold" mb={1}>
                                {feature.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {feature.description}
                              </Typography>
                            </Card>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </motion.div>
              )}

              {/* Team Tab */}
              {activeTab === 1 && (
                <motion.div
                  key="team"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h4" textAlign="center" mb={3} color="primary">
                      Meet Our Team
                    </Typography>
                    <Grid container spacing={3}>
                      {team.map((member, index) => (
                        <Grid item xs={12} key={index}>
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                          >
                            <Card
                              sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: 'center',
                                p: 3,
                                borderRadius: 3,
                                boxShadow: 6,
                                bgcolor: darkMode ? 'rgba(25, 118, 210, 0.15)' : 'rgba(255,255,255,0.95)',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                  transform: 'scale(1.02)',
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
                                sx={{ 
                                  width: 120, 
                                  height: 120, 
                                  m: 2, 
                                  boxShadow: 3, 
                                  border: '4px solid #1976d2',
                                  transition: 'transform 0.3s ease',
                                  '&:hover': {
                                    transform: 'scale(1.1)',
                                  }
                                }}
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
                                  <Tooltip title="LinkedIn Profile">
                                    <IconButton
                                      href={member.linkedin}
                                      color="primary"
                                      target="_blank"
                                      rel="noopener"
                                      size="small"
                                    >
                                      <LinkedInIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="GitHub Profile">
                                    <IconButton
                                      href={member.github}
                                      color="primary"
                                      target="_blank"
                                      rel="noopener"
                                      size="small"
                                    >
                                      <GitHubIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Stack>
                                <Typography variant="subtitle1" color="text.secondary" mb={1}>
                                  {member.role}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" mb={2}>
                                  {member.bio}
                                </Typography>
                                
                                {/* Skills */}
                                <Box sx={{ mb: 2 }}>
                                  <Typography variant="body2" fontWeight="bold" mb={1}>
                                    Skills:
                                  </Typography>
                                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                    {member.skills.map((skill, skillIndex) => (
                                      <Chip
                                        key={skillIndex}
                                        label={skill}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontSize: '0.7rem' }}
                                      />
                                    ))}
                                  </Box>
                                </Box>

                                {/* Achievements */}
                                <Box>
                                  <Typography variant="body2" fontWeight="bold" mb={1}>
                                    Achievements:
                                  </Typography>
                                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                    {member.achievements.map((achievement, achievementIndex) => (
                                      <Chip
                                        key={achievementIndex}
                                        label={achievement}
                                        size="small"
                                        color="success"
                                        variant="outlined"
                                        icon={<StarIcon />}
                                        sx={{ fontSize: '0.7rem' }}
                                      />
                                    ))}
                                  </Box>
                                </Box>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </motion.div>
              )}

              {/* Milestones Tab */}
              {activeTab === 2 && (
                <motion.div
                  key="milestones"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h4" textAlign="center" mb={3} color="primary">
                      Our Journey
                    </Typography>
                    <Box sx={{ position: 'relative' }}>
                      {milestones.map((milestone, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mb: 3,
                              p: 2,
                              borderRadius: 2,
                              bgcolor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                              border: '1px solid',
                              borderColor: 'primary.main',
                              position: 'relative',
                            }}
                          >
                            <Box
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 2,
                                color: 'white',
                                flexShrink: 0,
                              }}
                            >
                              {milestone.icon}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="h6" fontWeight="bold" color="primary">
                                {milestone.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {milestone.description}
                              </Typography>
                              <Chip 
                                label={milestone.year} 
                                size="small" 
                                color="secondary"
                                sx={{ mt: 1 }}
                              />
                            </Box>
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              )}

              {/* Technology Tab */}
              {activeTab === 3 && (
                <motion.div
                  key="technology"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h4" textAlign="center" mb={3} color="primary">
                      Technology Stack
                    </Typography>
                    
                    <Accordion 
                      expanded={expandedAccordion === 'panel1'} 
                      onChange={handleAccordionChange('panel1')}
                      sx={{ mb: 2 }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6" fontWeight="bold">
                          Frontend Technologies
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          {['React', 'Material-UI', 'Framer Motion', 'TypeScript', 'PWA'].map((tech, index) => (
                            <Grid item xs={6} sm={4} key={index}>
                              <Chip label={tech} color="primary" variant="outlined" />
                            </Grid>
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion 
                      expanded={expandedAccordion === 'panel2'} 
                      onChange={handleAccordionChange('panel2')}
                      sx={{ mb: 2 }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6" fontWeight="bold">
                          Backend & AI
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          {['Node.js', 'n8n Workflows', 'Google Gemini AI', 'Firebase', 'Real-time APIs'].map((tech, index) => (
                            <Grid item xs={6} sm={4} key={index}>
                              <Chip label={tech} color="secondary" variant="outlined" />
                            </Grid>
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion 
                      expanded={expandedAccordion === 'panel3'} 
                      onChange={handleAccordionChange('panel3')}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6" fontWeight="bold">
                          Data & Infrastructure
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          {['Delhi Metro API', 'DTC Bus Data', 'Google Maps', 'Real-time Tracking', 'Offline Support'].map((tech, index) => (
                            <Grid item xs={6} sm={4} key={index}>
                              <Chip label={tech} color="success" variant="outlined" />
                            </Grid>
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Paper>
        </Box>
      </motion.div>
            {/* Call to Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Box
          sx={{
            width: '100%',
            p: 4,
            borderRadius: 3,
            background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
            color: 'white',
            textAlign: 'center',
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255,255,255,0.1)',
              zIndex: 1,
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>
              Ready to Transform Your Commute?
            </Typography>
            <Typography variant="h6" mb={3} sx={{ opacity: 0.9 }}>
              Join thousands of users who have already discovered the power of real-time transit tracking
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: '#667eea',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Try YourRoute Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderColor: 'white',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Box>
      </motion.div>
      {/* Acknowledgments Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Paper
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            bgcolor: darkMode ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.95)',
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            mb={3}
            color="primary"
          >
            Acknowledgments
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            mb={3}
            color="text.primary"
          >
            Our project stands on the shoulders of giants. Many thanks to:
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  p: 2,
                  textAlign: 'center',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: 6,
                  },
                  border: '1px solid',
                  borderColor: 'primary.main',
                }}
              >
                <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6" fontWeight="bold" mb={1}>
                  Code For Bharat
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  For providing the platform and mentorship that made YourRoute possible
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  p: 2,
                  textAlign: 'center',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: 6,
                  },
                  border: '1px solid',
                  borderColor: 'secondary.main',
                }}
              >
                <PublicIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                <Typography variant="h6" fontWeight="bold" mb={1}>
                  Delhi Metro
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  For providing real-time transit data and API access
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  p: 2,
                  textAlign: 'center',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: 6,
                  },
                  border: '1px solid',
                  borderColor: 'success.main',
                }}
              >
                <CodeIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h6" fontWeight="bold" mb={1}>
                  Open Source Community
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  For the amazing tools and libraries that power YourRoute
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Box>
  )
}
