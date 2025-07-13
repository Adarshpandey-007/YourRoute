import React, {useState, useContext} from 'react'
import {
  List,
  ListItemButton,
  Drawer,
  IconButton,
  Typography,
  Divider,
  useTheme,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {Info as InfoIcon} from '@mui/icons-material'
import {Mail as MailIcon} from '@mui/icons-material'
import {FilterList as FilterListIcon} from '@mui/icons-material'
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material'
import {AccessTime as AccessTimeIcon} from '@mui/icons-material'
import {Menu as MenuIcon} from '@mui/icons-material'
import HomeIcon from '@mui/icons-material/Home'
import TimelineIcon from '@mui/icons-material/Timeline'
import MapIcon from '@mui/icons-material/Map'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import PersonIcon from '@mui/icons-material/Person'
import AppContext from '../appContext'
import { useAITripPlanner } from '../aiTripPlannerContext'

export default function SettingsDrawer(props) {
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const {darkMode, setDarkMode} = useContext(AppContext)
  const theme = useTheme()
  const { openAITripPlanner } = useAITripPlanner()

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  return (
    <>
      <IconButton
        edge="start"
        color="primary"
        aria-label="menu"
        onClick={handleDrawerOpen}
        sx={{
          position: 'absolute',
          right: '30px',
          top: '90px',
          zIndex: 1200,
          borderRadius: '50%',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <List
          sx={{
            width: '200px',
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '20px',
            }}
          >
            Menu
          </Typography>
          <Divider />
          <ListItemButton
            onClick={() => {
              handleDrawerClose()
              navigate('/')
            }}
          >
            <HomeIcon
              sx={{
                mr: 2,
              }}
            />
            Home
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              handleDrawerClose()
              navigate('/map')
            }}
          >
            <MapIcon
              sx={{
                mr: 2,
              }}
            />
            Live Map
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              handleDrawerClose()
              openAITripPlanner()
            }}
          >
            <SmartToyIcon
              sx={{
                mr: 2,
              }}
            />
            AI Agent
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              handleDrawerClose()
              navigate('/')
              // Add login/signup logic here
              console.log('Login/Signup triggered from drawer')
            }}
          >
            <PersonIcon
              sx={{
                mr: 2,
              }}
            />
            Login/Signup
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              handleDrawerClose()
              navigate('/timeline')
            }}
          >
            <TimelineIcon
              sx={{
                mr: 2,
              }}
            />
            Timeline
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              handleDrawerClose()
              navigate('/contact')
            }}
          >
            <MailIcon
              sx={{
                mr: 2,
              }}
            />
            Contact Us
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              handleDrawerClose()
              navigate('/about')
            }}
            autoFocus
            sx={{
              paddingBottom: '6%',
            }}
          >
            <InfoIcon
              sx={{
                mr: 2,
              }}
            />
            About Us
          </ListItemButton>
          <Divider />
          <ListItemButton
            onClick={() => {
              props.toggleDisplayTime()
            }}
          >
            <AccessTimeIcon
              sx={{
                mr: 2,
              }}
            />
            {props.displayTime ? 'Hide Time' : 'Show Time'}
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setDarkMode(!darkMode)
            }}
          >
            {props.darkMode ? (
              <Brightness7Icon
                sx={{
                  mr: 2,
                }}
              />
            ) : (
              <Brightness4Icon
                sx={{
                  mr: 2,
                }}
              />
            )}
            {props.darkMode ? 'Light Mode' : 'Dark Mode'}
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              props.handleFilterToggle()
            }}
          >
            <FilterListIcon
              sx={{
                mr: 2,
              }}
            />
            {props.filter ? 'Show Past Buses' : 'Show Recent Buses'}
          </ListItemButton>
        </List>
      </Drawer>
    </>
  )
}
