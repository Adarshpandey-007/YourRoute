import React, {useEffect, useState, useRef, useContext} from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import {Box, Typography, useTheme} from '@mui/material'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import LaptopIcon from '@mui/icons-material/Laptop'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PersonIcon from '@mui/icons-material/Person'
import AssignmentIcon from '@mui/icons-material/Assignment'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import CelebrationIcon from '@mui/icons-material/Celebration'
import AppContext from '../../appContext'
import {motion, AnimatePresence} from 'framer-motion'
import {useViewportWidth} from '../../App'

// Hook for animation check
function useIntersectionObserver(
  elementRef,
  {threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false},
) {
  const [entry, setEntry] = useState()

  const frozen = entry?.isIntersecting && freezeOnceVisible

  const updateEntry = ([entry]) => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = elementRef?.current
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !node) return

    const observerParams = {threshold, root, rootMargin}
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef, threshold, root, rootMargin, frozen])

  return entry
}

function TimelineElement({date, setBackgroundImage, events}) {
  const triggerRef = useRef(null)
  const entry = useIntersectionObserver(triggerRef, {threshold: 0.1})
  const theme = useTheme()

  useEffect(() => {
    if (entry?.isIntersecting) {
      setBackgroundImage((prev) =>
        prev === events[date].url ? prev : events[date].url,
      )
    }
  }, [entry, date, setBackgroundImage, events])

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      date={date}
      contentStyle={{
        marginBottom: '80vh',
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[0],
      }}
      contentArrowStyle={{
        borderRight: `7px solid  ${theme.palette.background.paper}`,
      }}
      iconStyle={{
        background: theme.palette.primary.main,
        color: theme.palette.secondary.main,
      }}
      icon={events[date].icon}
    >
      <h3>{events[date].name}</h3>
      <p>{events[date].description}</p>
      <Box
        ref={triggerRef}
        sx={{
          position: 'relative',
          top: '10vh',
        }}
      />
    </VerticalTimelineElement>
  )
}

export default function MyTimeline() {
  const viewportWidth = useViewportWidth()

  const events = {
    'January 2024': {
      url:
        viewportWidth < 600
          ? 'background/planning.png'
          : 'background/planningDesktop.png',
      icon: <LightbulbIcon />,
      name: 'The Spark of Innovation',
      description:
        'Our journey began when we identified a real problem: unpredictable public transit schedules affecting daily commuters. We discovered that existing solutions were outdated or unreliable. This sparked our mission to create YourRoute - a modern, real-time transit tracking solution that would empower commuters with live information and intelligent route planning.',
    },
    'February 2024': {
      url:
        viewportWidth < 600
          ? 'background/hackathon.png'
          : 'background/hackathonDesktop.png',
      icon: <LaptopIcon />,
      name: 'Prototype Development',
      description:
        'We started building the core infrastructure using React, Material-UI, and Google Maps API. Our initial prototype focused on real-time bus tracking with a clean, intuitive interface. We integrated Firebase for real-time data management and began developing the map visualization system that would become the heart of YourRoute.',
    },
    'March 2024': {
      url:
        viewportWidth < 600
          ? 'background/competition.png'
          : 'background/competitionDesktop.png',
      icon: <AutoGraphIcon />,
      name: 'AI Integration & Testing',
      description:
        'This month marked a major milestone as we integrated AI-powered route planning using n8n workflow automation. We implemented intelligent ETA predictions, dynamic route optimization, and personalized recommendations. Extensive testing with real transit data helped us refine the algorithms and improve accuracy.',
    },
    'April 2024': {
      url:
        viewportWidth < 600
          ? 'background/data.png'
          : 'background/dataDesktop.png',
      icon: <EmojiEventsIcon />,
      name: 'PWA Launch & Optimization',
      description:
        'YourRoute evolved into a Progressive Web App (PWA) with offline capabilities, push notifications, and seamless cross-platform experience. We optimized performance, enhanced the UI/UX, and implemented advanced features like accessibility support and dark mode. The app was now ready for real-world deployment.',
    },
    'May 2024': {
      url: 'background/coding.png',
      icon: <TrendingUpIcon />,
      name: 'Expansion & Future Vision',
      description:
        'YourRoute expanded beyond Delhi to support multiple cities and transit systems. We implemented advanced features like multi-modal routing, real-time alerts, and community-driven improvements. Our vision evolved to create a comprehensive transit ecosystem that serves millions of commuters across India.',
    },
  }

  const [backgroundImage, setBackgroundImage] = useState(
    events['January 2024'].url,
  )
  const theme = useTheme()

  const {darkMode} = useContext(AppContext)

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <AnimatePresence>
        <motion.section
          key={backgroundImage}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.5}}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: 'url(' + backgroundImage + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: darkMode ? 'brightness(0.5)' : 'brightness(1)',
            overflow: 'hidden',
            zIndex: -1,
          }}
        />
      </AnimatePresence>
      <Typography
        variant="h3"
        marginTop="5vh"
        align="center"
        color={darkMode ? 'white' : 'black'}
      >
        YourRoute Development Timeline
      </Typography>
      <Typography
        variant="h6"
        marginTop="2vh"
        align="center"
        color={darkMode ? 'white' : 'black'}
        sx={{ opacity: 0.8, mb: 4 }}
      >
        Our Journey from Idea to Innovation
      </Typography>
              <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        <Typography
          variant="body2"
          align="center"
          color={darkMode ? 'white' : 'black'}
          sx={{ 
            opacity: 0.9, 
            bgcolor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            px: 2,
            py: 1,
            borderRadius: 2
          }}
        >
          🚀 Real-Time Transit Tracking
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color={darkMode ? 'white' : 'black'}
          sx={{ 
            opacity: 0.9, 
            bgcolor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            px: 2,
            py: 1,
            borderRadius: 2
          }}
        >
          🤖 AI-Powered Route Planning
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color={darkMode ? 'white' : 'black'}
          sx={{ 
            opacity: 0.9, 
            bgcolor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            px: 2,
            py: 1,
            borderRadius: 2
          }}
        >
          📱 Cross-Platform PWA
        </Typography>
      </Box>
      <VerticalTimeline lineColor={theme.palette.primary.main}>
        {Object.keys(events).map((date) => (
          <TimelineElement
            key={date}
            date={date}
            events={events}
            setBackgroundImage={setBackgroundImage}
          />
        ))}
      </VerticalTimeline>
      
      {/* Call to Action Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 6,
          px: 2,
          background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          borderRadius: 3,
          mx: 2,
          mb: 4
        }}
      >
        <Typography
          variant="h4"
          sx={{ 
            mb: 2,
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            px: 3,
            py: 2,
            borderRadius: 2,
            boxShadow: theme.shadows[0],
            display: 'inline-block'
          }}
        >
          Empowering Commuters Across India 🚀
        </Typography>
        <Typography
          variant="body1"
          sx={{ 
            mb: 3, 
            maxWidth: 600, 
            mx: 'auto',
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            px: 3,
            py: 2,
            borderRadius: 2,
            boxShadow: theme.shadows[0]
          }}
        >
          YourRoute is more than just a transit app - it's a comprehensive solution that combines real-time data, AI-powered intelligence, and user-centric design to revolutionize how people navigate cities. Our mission is to make public transportation smarter, more accessible, and more reliable for everyone.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Typography
            variant="body2"
            sx={{ 
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              px: 3,
              py: 1,
              borderRadius: 2,
              fontWeight: 'bold',
              boxShadow: theme.shadows[0]
            }}
          >
            🎯 Real-Time Transit Data
          </Typography>
          <Typography
            variant="body2"
            sx={{ 
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              px: 3,
              py: 1,
              borderRadius: 2,
              fontWeight: 'bold',
              boxShadow: theme.shadows[0]
            }}
          >
            🤖 AI-Powered Intelligence
          </Typography>
          <Typography
            variant="body2"
            sx={{ 
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              px: 3,
              py: 1,
              borderRadius: 2,
              fontWeight: 'bold',
              boxShadow: theme.shadows[0]
            }}
          >
            📱 Cross-Platform Experience
          </Typography>
        </Box>
      </Box>
    </div>
  )
}
