import React, {useState, useEffect, useContext, useRef} from 'react'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Box} from '@mui/material'
import { DirectionsBus as BusIcon } from '@mui/icons-material'
import {RouteContext} from '../Route'
import MainWizard from './Wizard/MainWizard'
import InstallPWAButton from './PwaButton'
import SettingsDrawer from './SettingsDrawer'
import AppContext from '../appContext'
import {AnimatePresence} from 'framer-motion'
import { collection, getDocs } from 'firebase/firestore'
import { database, getAllBuses, getAllMetroBuses, getUpdatedBuses, getUpdatedMetroBuses, getBusEtas } from './firebase'
import { busStopIcon } from './StopMarkers'
import L from 'leaflet'

// Custom user location icon
const userLocationIcon = L.divIcon({
  className: 'user-location-icon',
  html: `
    <div style="
      width: 20px;
      height: 20px;
      background: #1976d2;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
      position: relative;
    ">
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
      "></div>
    </div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
})

// Map controller component for handling center and zoom changes
function MapController({ center, zoom, userLocation, onCenterChange, onZoomChange, onMapClick }) {
  const map = useMap()
  
  useEffect(() => {
    if (center && (map.getCenter().lat !== center.lat || map.getCenter().lng !== center.lng)) {
      map.setView([center.lat, center.lng], zoom)
    }
  }, [center, zoom, map])
  
  useEffect(() => {
    const handleMoveEnd = () => {
      const center = map.getCenter()
      onCenterChange({ lat: center.lat, lng: center.lng })
    }
    
    const handleZoomEnd = () => {
      onZoomChange(map.getZoom())
    }
    
    const handleClick = (e) => {
      if (onMapClick) {
        onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng })
      }
    }
    
    map.on('moveend', handleMoveEnd)
    map.on('zoomend', handleZoomEnd)
    map.on('click', handleClick)
    
    return () => {
      map.off('moveend', handleMoveEnd)
      map.off('zoomend', handleZoomEnd)
      map.off('click', handleClick)
    }
  }, [map, onCenterChange, onZoomChange, onMapClick])
  
  return null
}

export default function MapComponent({center, zoom, userLocation, onCenterChange, onZoomChange, onMapClick}) {
  const [displayTime, setDisplayTime] = useState(true)
  const {darkMode} = useContext(AppContext)
  const [filter, setFilter] = useState(true) // If true, only displays buses from last 30 minutes

  // Wizard State
  const [wizardOpen, setWizardOpen] = useState(
    localStorage.getItem('wizard') !== 'false',
  )

  // Stores the buses in a state variable to rerender
  const [buses, setBuses] = useState([])
  const [metroBuses, setMetroBuses] = useState([])
  const combinedBuses = buses.concat(metroBuses)
  const [selectedRoute] = useContext(RouteContext)
  const [stopsEta, setStopsEta] = useState({cw: {}, ccw: {}})
  const [busStops, setBusStops] = useState([])

  function toggleDisplayTime() {
    setDisplayTime(!displayTime)
  }

  function handleFilterToggle() {
    setFilter(!filter)
  }

  useEffect(() => {
    let interval, interval2

    const fetchAllData = () => {
      getAllBuses().then((buses) => {
        setBuses(buses)
      })
    }
    const fetchAllMetroData = () => {
      getAllMetroBuses().then((buses) => {
        setMetroBuses(buses)
      })
    }

    const fetchUpdatedData = () => {
      getUpdatedBuses().then((newBuses) => {
        setBuses((oldBuses) => {
          return oldBuses.map((oldBus) => {
            const newBus = newBuses.find((bus) => bus.id === oldBus.id)
            return newBus || oldBus
          })
        })
      })
    }

    const fetchUpdatedMetroData = () => {
      getUpdatedMetroBuses().then((newBuses) => {
        console.log(newBuses)
        setMetroBuses((oldBuses) => {
          return oldBuses.map((oldBus) => {
            const newBus = newBuses.find((bus) => bus.id === oldBus.id)
            return newBus || oldBus
          })
        })
      })
    }

    const updateStopEtas = async () => {
      setStopsEta(await getBusEtas())
    }

    const setupIntervals = () => {
      // Update positions of markers every 5 seconds
      interval = setInterval(fetchUpdatedData, 5000)
      interval2 = setInterval(fetchUpdatedMetroData, 12000)
    }

    const clearIntervals = () => {
      clearInterval(interval)
      clearInterval(interval2)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchUpdatedData()
        fetchUpdatedMetroData()
        updateStopEtas()
        clearIntervals() // Clear existing intervals
        setupIntervals() // Set up new intervals
      } else {
        clearIntervals() // Clear intervals when the app loses focus
      }
    }

    // Initial load of markers, including ones update more than 30 minutes ago
    fetchAllData()
    fetchAllMetroData()
    updateStopEtas()
    setupIntervals()

    // Add event listeners to handle app focus and blur events
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearIntervals()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [center])

  // Fetch bus stops from Firestore
  useEffect(() => {
    async function fetchBusStops() {
      const querySnapshot = await getDocs(collection(database, 'bus_stops'));
      const stops = [];
      querySnapshot.forEach((doc) => {
        stops.push(doc.data());
      });
      setBusStops(stops);
    }
    fetchBusStops();
  }, []);

  return (
    <>
      <Box id="map" width="100%" height="100vh" data-testid="map">
        <MapContainer center={[center.lat, center.lng]} zoom={zoom} style={{ height: '100vh', width: '100vw' }} zoomControl={false}>
          <MapController 
            center={center} 
            zoom={zoom} 
            userLocation={userLocation}
            onCenterChange={onCenterChange}
            onZoomChange={onZoomChange}
            onMapClick={onMapClick}
          />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />
          
          {/* User Location Marker */}
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon}>
              <Popup>
                <div>
                  <strong>Your Location</strong><br />
                  <small>Lat: {userLocation.lat.toFixed(6)}<br />
                  Lng: {userLocation.lng.toFixed(6)}</small>
                </div>
              </Popup>
            </Marker>
          )}
          
          {/* Bus Markers */}
          {combinedBuses
            .filter((bus) => !filter || (bus.lastPing && true))
            .filter((bus) => selectedRoute.includes(bus.route))
            .map((bus) => (
              <Marker key={bus.id} position={[parseFloat(bus.lastLatitude), parseFloat(bus.lastLongitude)]}>
                <Popup>
                  <div style={{ minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <BusIcon color="primary" style={{ fontSize: '20px' }} />
                      <strong style={{ color: '#1976d2' }}>Bus {bus.id}</strong>
                    </div>
                    <div style={{ marginBottom: '4px' }}>
                      <strong>Route:</strong> {bus.route}
                    </div>
                    {bus.lastPing && (
                      <div style={{ marginBottom: '4px' }}>
                        <strong>Last Update:</strong> {new Date(bus.lastPing).toLocaleTimeString()}
                      </div>
                    )}
                    <div style={{ marginBottom: '4px' }}>
                      <strong>Location:</strong><br />
                      <small>Lat: {parseFloat(bus.lastLatitude).toFixed(6)}<br />
                      Lng: {parseFloat(bus.lastLongitude).toFixed(6)}</small>
                    </div>
                    {bus.speed && (
                      <div>
                        <strong>Speed:</strong> {bus.speed} km/h
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          
          {/* Bus Stop Markers */}
          {busStops.map((stop) => (
            <Marker key={stop.stop_id} position={[stop.lat, stop.lng]} icon={busStopIcon}>
              <Popup>
                <div>
                  <strong>Stop:</strong> {stop.stop_name}<br />
                  <strong>Stop ID:</strong> {stop.stop_id}
                  {stopsEta[stop.stop_id] && <div><strong>ETA:</strong> {stopsEta[stop.stop_id]}</div>}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
      <AnimatePresence mode="wait">
        {wizardOpen && (
          <MainWizard
            closeWizard={() => setWizardOpen(false)}
            neverShowAgain={() => {
              localStorage.setItem('wizard', false);
              setWizardOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      <SettingsDrawer
        filter={filter}
        handleFilterToggle={handleFilterToggle}
        displayTime={displayTime}
        toggleDisplayTime={toggleDisplayTime}
        darkMode={darkMode}
      />
      <InstallPWAButton />
    </>
  )
}
