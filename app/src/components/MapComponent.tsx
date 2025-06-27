'use client'
import Map from "react-map-gl/mapbox";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import './map.css'

const INITIAL_CENTER : [number, number]= [
    -74.0242,
    40.6941
  ]
const INITIAL_ZOOM = 10.12
  

const MapComponent = (ingredient) => {
    const [center, setCenter] = useState(INITIAL_CENTER)
    const [zoom, setZoom] = useState(INITIAL_ZOOM)

    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    const handleButtonClick = () => {
        mapRef.current.flyTo({
          center: INITIAL_CENTER,
          zoom: INITIAL_ZOOM
        })
      }
      
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXZlcnRyZWVzIiwiYSI6ImNrMGIzNjd0MDBxOGczanI3YXRnMndmb28ifQ.vMs6tdz00Q9KCQ_OSWtn8w'
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          center: center,
          zoom: zoom
        });

        mapRef.current?.on('load', () => {
            mapRef.current?.addSource('counties', {
                'type': 'vector',
                'url': 'mapbox://mapbox.82pkq93d'
            });
    
            mapRef.current?.addLayer({
                'id': 'counties',
                'type': 'fill',
                'source': 'counties',
                'source-layer': 'original',
                'paint': {
                    'fill-outline-color': 'rgba(0,0,0,0.1)',
                    'fill-color': 'rgba(0,0,0,0.1)'
                },
                'slot': 'middle'
            });
        })
    
        mapRef.current.on('move', () => {
          // get the current center coordinates and zoom level from the map
          const mapCenter = mapRef.current.getCenter()
          const mapZoom = mapRef.current.getZoom()
    
          // update state
          setCenter([ mapCenter.lng, mapCenter.lat ])
          setZoom(mapZoom)
        })

        // display only features with the 'name' property 'USA'
        // mapRef.current.setFilter('my-layer', ['==', ['get', 'name'], 'USA']);
        
        return () => {
          mapRef.current.remove()
        }
    }, [])

    return (
        <>
          <div className="sidebar">
            Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
          </div>
          <button className='reset-button' onClick={handleButtonClick}>
            Reset
        </button>
          <div id='map-container'  style={{ width: '500px' }} ref={mapContainerRef} />
        </>
      )
}

export default MapComponent