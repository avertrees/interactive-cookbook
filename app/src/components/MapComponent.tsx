'use client'
import Map from "react-map-gl/mapbox";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import './map.css'
import countries from "world-countries";
const INITIAL_CENTER : [number, number]= [
    -74.0242,
    40.6941
  ]
const INITIAL_ZOOM = 10.12
  

const MapComponent = (ingredient) => {
    // const [center, setCenter] = useState(INITIAL_CENTER)
    // const [zoom, setZoom] = useState(INITIAL_ZOOM)
    console.log("countries : ", countries[0])
    const map = useRef<mapboxgl.Map | null>(null);
    const mapContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          center: [-77.0323, 38.9131],
          zoom: INITIAL_ZOOM
        });
    
        map.current.on('load', function () {
  // Add source for admin-0 Boundaries.
  map.current.addSource('admin-0', {
    type: 'vector',
    url: 'mapbox://mapbox.enterprise-boundaries-a0-v1'
  });
  // Add a layer with boundary lines.
  map.current.addLayer({
    id: 'admin-0-line',
    type: 'line',
    source: 'admin-0',
    'source-layer': 'boundaries_admin_0',
    paint: {
      'line-color': 'red',
      'line-width': ['interpolate', ['linear'], ['zoom'], 0, 2, 20, 10]
    }
  }, 'waterway-label');
  // Add a layer with points.
  map.current.addLayer({
    id: 'admin-0-circle',
    type: 'circle',
    source: 'admin-0',
    'source-layer': 'points_admin_0',
    paint: {
      'circle-color': 'white',
      'circle-stroke-color': 'black',
      'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 0, 2, 20, 6],
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 20, 20]
    }
  }, 'waterway-label');

        })
    })

    return (
        <>
          <div id='map-container'  style={{ width: '500px' }} ref={mapContainer} />
        </>
      )
}

export default MapComponent