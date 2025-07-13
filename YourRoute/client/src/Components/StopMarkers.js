import {Box, Tooltip} from '@mui/material'
import React from 'react'
import L from 'leaflet';
import busStop from '../data/busStop.png';

export const busStopIcon = new L.Icon({
  iconUrl: busStop,
  iconSize: [32, 32], // adjust as needed
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: 'bus-stop-icon',
});

export default function StopMarker(props) {
  /*
  Stop Marker Component
  Returns a marker to mark the bus stops 
  Props: key lat lon name eta displayTime darkMode
  Stop object contains id, lat, lon, name
  */

  const displayName = props.name

  function formatTime(eta) {
    if (!eta) return null;
    // eta: { bus: 'xyz', time: '12:00', min: 5 }
    return `Next bus is "${eta.bus}" arriving at ${eta.time} in ${eta.min} min`;
  }

  return (
    <Tooltip title=
      {
        <>
          <Box component="div" style={{fontSize:"1rem"}}>{displayName}</Box>
          {props.eta && (
            <Box component="div" style={{fontSize:"0.8rem"}}>{formatTime(props.eta)}</Box>
          )}
        </>
      }
     placement="top" style={{position:"relative"}}>
      <Box component="img" src={busStop} alt={displayName} style={{
        position:"relative",
        transform: 'translate(-50%, -50%)',
        height:"1rem",
        minHeight:"20px",
        width:"1rem",
        minWidth:"20px"}}/>
    </Tooltip>
  )
}