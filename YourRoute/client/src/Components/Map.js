import React from 'react'
import MapComponent from './MapComponent'

export default function Map() {
  // Coordinates of Delhi
  const center = {lat: 28.6139, lng: 77.2090} // New Delhi city center
  const zoom = 12

  // Add data-testid for testing
  return <div data-testid="map"><MapComponent center={center} zoom={zoom} /></div>
}
