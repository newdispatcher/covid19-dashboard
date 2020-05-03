import React, { useState, useEffect } from "react"
import ReactMapGL, { Marker } from "react-map-gl"
import { fetchMapData } from '../../api'
const TOKEN = "pk.eyJ1IjoiYXlhbmJhZyIsImEiOiJjanRsNHRkNWUwYTFuNGFwZjJzZzllYWlrIn0.bIaS81q6CGFuuAF1FOHTow"


const Map = ({ data }) => {

  const [ viewport, setViewport ] = useState({
    latitude: 16.636192,
    longitude: 5.189195,
    zoom: 0.1,
  })

  const [ mapData, setMapData ] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
        const initialMapData = await fetchMapData();

        setMapData(initialMapData);
    }

  fetchAPI();
  }, []);

  const updateViewport = (viewport) => {
    setViewport(viewport)
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  return (
        <ReactMapGL
          {...viewport}
          width='100%'
          height='100%'
          mapStyle="mapbox://styles/ayanbag/ck9r7hmth1pj31imromhcamlc"
          onViewportChange={updateViewport}
          mapboxApiAccessToken={TOKEN}
        >
          {mapData ? mapData.map((country, i) => {
            const a = getRandomInt(20) + 4;
            const b = a / 2;
            const c = b - 2;
            const d = Math.random();
            const colors = ["#ff9478", '#f03434', '#f62459', '#d64541'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            return(
              <Marker
                key={i}
                latitude={country.latitude ? country.latitude : 37.78}
                longitude={country.longitude ? country.longitude : -122.41}
                zoom={1}>
                  <svg width={a} height={a}>
                    <circle cx={b} cy={b} r={c} fill={color} fillOpacity={d} />
                  </svg>
              </Marker>
          )}) : null }
        </ReactMapGL>
  )
}

export default Map
