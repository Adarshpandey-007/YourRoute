import React, { useState, useEffect, useContext } from 'react'
import MapComponent from './MapComponent'
import TripPlanner from './TripPlanner/TripPlanner'
import {
  Box,
  Paper,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  Fab,
  Tooltip,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material'
import {
  Search as SearchIcon,
  MyLocation as LocationIcon,
  DirectionsBus as BusIcon,
  Route as RouteIcon,
  Clear as ClearIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { RouteContext } from '../Route'
import AppContext from '../appContext'
import delhiBusStops from '../data/delhi-bus-stops.json'
import './Map.css'

export default function Map() {
  const { darkMode } = useContext(AppContext)
  const [selectedRoute, setSelectedRoute] = useContext(RouteContext)
  
  // State for enhanced functionality
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 }) // Delhi center
  const [zoom, setZoom] = useState(12)
  const [showRouteDialog, setShowRouteDialog] = useState(false)
  const [favoriteStops, setFavoriteStops] = useState([])
  const [locationError, setLocationError] = useState('')
  const [showLocationError, setShowLocationError] = useState(false)
  const [clickedLocation, setClickedLocation] = useState(null)
  const [nearbyStops, setNearbyStops] = useState([])
  const [showRouteInfo, setShowRouteInfo] = useState(false)

  // Available routes for selection
  const availableRoutes = [
    { id: 'LOOP', name: 'Campus Loop', type: 'Campus' },
    { id: 'UPPER CAMPUS', name: 'Upper Campus', type: 'Campus' },
    { id: '3A', name: 'Metro Route 3A', type: 'Metro' },
    { id: '3B', name: 'Metro Route 3B', type: 'Metro' },
    { id: '18', name: 'Metro Route 18', type: 'Metro' },
    { id: '19', name: 'Metro Route 19', type: 'Metro' },
    { id: '20', name: 'Metro Route 20', type: 'Metro' },
  ]

  // Search bus stops
  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.length > 2) {
      const results = delhiBusStops.filter(stop =>
        stop.stop_name.toLowerCase().includes(query.toLowerCase()) ||
        stop.stop_id.toString().includes(query)
      ).slice(0, 10) // Limit to 10 results
      setSearchResults(results)
      setShowSearchResults(true)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }

  // Get user location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser')
      setShowLocationError(true)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ lat: latitude, lng: longitude })
        setMapCenter({ lat: latitude, lng: longitude })
        setZoom(15)
        setLocationError('')
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location'
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.'
            break
        }
        setLocationError(errorMessage)
        setShowLocationError(true)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  }

  // Handle stop selection
  const handleStopSelect = (stop) => {
    setMapCenter({ lat: stop.lat, lng: stop.lng })
    setZoom(16)
    setSearchQuery(stop.stop_name)
    setShowSearchResults(false)
  }

  // Toggle favorite stop
  const toggleFavoriteStop = (stop) => {
    setFavoriteStops(prev => {
      const isFavorite = prev.some(fav => fav.stop_id === stop.stop_id)
      if (isFavorite) {
        return prev.filter(fav => fav.stop_id !== stop.stop_id)
      } else {
        return [...prev, stop]
      }
    })
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setShowSearchResults(false)
  }

  // Route selection handlers
  const handleRouteSelect = (routeId) => {
    if (selectedRoute.includes(routeId)) {
      setSelectedRoute(selectedRoute.filter(r => r !== routeId))
    } else {
      setSelectedRoute([...selectedRoute, routeId])
    }
  }

  const selectAllRoutes = () => {
    setSelectedRoute(availableRoutes.map(route => route.id))
  }

  const clearAllRoutes = () => {
    setSelectedRoute([])
  }

  // Handle map click to find nearby stops
  const handleMapClick = (location) => {
    setClickedLocation(location)
    
    // Find stops within 1km radius
    const nearby = delhiBusStops.filter(stop => {
      const distance = calculateDistance(
        location.lat, location.lng,
        stop.lat, stop.lng
      )
      return distance <= 1 // 1km radius
    }).slice(0, 5) // Show top 5 nearest stops
    
    setNearbyStops(nearby)
  }

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  return (
    <Box sx={{ position: 'relative', height: '100vh' }}>
      {/* Enhanced Map Component */}
      <MapComponent 
        center={mapCenter} 
        zoom={zoom} 
        userLocation={userLocation}
        onCenterChange={setMapCenter}
        onZoomChange={setZoom}
        onMapClick={handleMapClick}
      />
      
      {/* Search Bar */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          right: 20,
          zIndex: 1000,
          maxWidth: 400,
        }}
      >
        <Paper
          elevation={3}
          className="search-bar"
          sx={{
            p: 1,
            borderRadius: 2,
            bgcolor: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SearchIcon color="primary" />
            <TextField
              fullWidth
              placeholder="Search bus stops..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              variant="standard"
              sx={{
                '& .MuiInput-underline:before': { borderBottom: 'none' },
                '& .MuiInput-underline:after': { borderBottom: 'none' },
              }}
            />
            {searchQuery && (
              <IconButton size="small" onClick={clearSearch}>
                <ClearIcon />
              </IconButton>
            )}
          </Box>
          
          {/* Search Results */}
          <AnimatePresence>
            {showSearchResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                                 <List className="search-results-container" sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {searchResults.map((stop) => (
                    <ListItem key={stop.stop_id} disablePadding>
                      <ListItemButton
                        onClick={() => handleStopSelect(stop)}
                        sx={{ py: 1 }}
                      >
                        <ListItemText
                          primary={stop.stop_name}
                          secondary={`Stop ID: ${stop.stop_id}`}
                          primaryTypographyProps={{ fontSize: '0.9rem' }}
                          secondaryTypographyProps={{ fontSize: '0.8rem' }}
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavoriteStop(stop)
                          }}
                        >
                          {favoriteStops.some(fav => fav.stop_id === stop.stop_id) ? (
                            <StarIcon color="warning" fontSize="small" />
                          ) : (
                            <StarBorderIcon fontSize="small" />
                          )}
                        </IconButton>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </motion.div>
            )}
          </AnimatePresence>
        </Paper>
      </Box>

      {/* Route Selection Button */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Tooltip title="Route Selection">
          <Fab
            color="primary"
            size="medium"
            className="map-fab"
            onClick={() => setShowRouteDialog(true)}
            sx={{ boxShadow: 3 }}
          >
            <RouteIcon />
          </Fab>
        </Tooltip>
      </Box>

      {/* Route Info Button */}
      <Box
        sx={{
          position: 'absolute',
          top: 140,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Tooltip title="Route Information">
          <Fab
            color="info"
            size="medium"
            className="map-fab"
            onClick={() => setShowRouteInfo(!showRouteInfo)}
            sx={{ boxShadow: 3 }}
          >
            <BusIcon />
          </Fab>
        </Tooltip>
      </Box>

      {/* Location Button */}
      <Box
        sx={{
          position: 'absolute',
          top: 80,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Tooltip title="My Location">
          <Fab
            color="secondary"
            size="medium"
            className="map-fab"
            onClick={getUserLocation}
            sx={{ boxShadow: 3 }}
          >
            <LocationIcon />
          </Fab>
        </Tooltip>
      </Box>

      {/* Nearby Stops */}
      {clickedLocation && nearbyStops.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 100,
            right: 20,
            zIndex: 1000,
            maxWidth: 300,
          }}
        >
          <Paper
            elevation={3}
            className="favorite-stops-container"
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationIcon color="primary" />
                Nearby Stops
              </Typography>
              <IconButton size="small" onClick={() => setClickedLocation(null)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Clicked location: {clickedLocation.lat.toFixed(4)}, {clickedLocation.lng.toFixed(4)}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {nearbyStops.map((stop) => (
                <Chip
                  key={stop.stop_id}
                  label={`${stop.stop_name} (${calculateDistance(clickedLocation.lat, clickedLocation.lng, stop.lat, stop.lng).toFixed(2)}km)`}
                  size="small"
                  className="nearby-stops-chip"
                  onClick={() => handleStopSelect(stop)}
                  sx={{ maxWidth: 280, justifyContent: 'flex-start' }}
                />
              ))}
            </Box>
          </Paper>
        </Box>
      )}

      {/* Favorite Stops */}
      {favoriteStops.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 100,
            left: 20,
            zIndex: 1000,
            maxWidth: 300,
          }}
        >
          <Paper
            elevation={3}
            className="favorite-stops-container"
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: darkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <StarIcon color="warning" />
              Favorite Stops
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {favoriteStops.map((stop) => (
                <Chip
                  key={stop.stop_id}
                  label={stop.stop_name}
                  size="small"
                  onClick={() => handleStopSelect(stop)}
                  onDelete={() => toggleFavoriteStop(stop)}
                  sx={{ maxWidth: 200 }}
                />
              ))}
            </Box>
          </Paper>
        </Box>
      )}

      {/* Route Selection Dialog */}
      <Dialog
        open={showRouteDialog}
        onClose={() => setShowRouteDialog(false)}
        maxWidth="sm"
        fullWidth
        className="route-dialog"
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BusIcon color="primary" />
            Route Selection
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={selectAllRoutes}
            >
              Select All
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={clearAllRoutes}
            >
              Clear All
            </Button>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>Campus Routes</Typography>
            {availableRoutes.filter(route => route.type === 'Campus').map((route) => (
              <Chip
                key={route.id}
                label={route.name}
                color={selectedRoute.includes(route.id) ? 'primary' : 'default'}
                variant={selectedRoute.includes(route.id) ? 'filled' : 'outlined'}
                onClick={() => handleRouteSelect(route.id)}
                className="route-chip"
                sx={{ m: 0.5 }}
              />
            ))}
            
            <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>Metro Routes</Typography>
            {availableRoutes.filter(route => route.type === 'Metro').map((route) => (
              <Chip
                key={route.id}
                label={route.name}
                color={selectedRoute.includes(route.id) ? 'primary' : 'default'}
                variant={selectedRoute.includes(route.id) ? 'filled' : 'outlined'}
                onClick={() => handleRouteSelect(route.id)}
                className="route-chip"
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Selected Routes: {selectedRoute.length}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRouteDialog(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Route Info Panel */}
      <AnimatePresence>
        {showRouteInfo && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                right: 80,
                zIndex: 1000,
                maxWidth: 280,
              }}
            >
              <Paper
                elevation={3}
                className="favorite-stops-container"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: darkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BusIcon color="info" />
                    Route Information
                  </Typography>
                  <IconButton size="small" onClick={() => setShowRouteInfo(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Selected Routes: {selectedRoute.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Bus Stops: {delhiBusStops.length}
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                {selectedRoute.length > 0 ? (
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Active Routes:</Typography>
                    {selectedRoute.map((routeId) => {
                      const route = availableRoutes.find(r => r.id === routeId)
                      return (
                        <Chip
                          key={routeId}
                          label={route ? route.name : routeId}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ m: 0.5 }}
                        />
                      )
                    })}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No routes selected. Use the route selection button to choose routes.
                  </Typography>
                )}
              </Paper>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trip Planner */}
      <TripPlanner />

      {/* Location Error Snackbar */}
      <Snackbar
        open={showLocationError}
        autoHideDuration={6000}
        onClose={() => setShowLocationError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowLocationError(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {locationError}
        </Alert>
      </Snackbar>
    </Box>
  )
}
