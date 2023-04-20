import {
    MapContainer,
    TileLayer,
    Marker,
    ZoomControl,
    useMap
  } from 'react-leaflet'
  
  import L from 'leaflet'
  
  import 'leaflet/dist/leaflet.css';

  const customMarkerIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const Map = ({ mapCenter }) => {
    return(
        <>
            <MapContainer center={mapCenter} zoom={13} zoomControl={false} scrollWheelZoom={false} className='h-[400px] lg:h-full overflow-hidden'>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomleft" />
                <Marker position={mapCenter} icon={customMarkerIcon}>
                </Marker>
            </MapContainer>
        </>
    )
  }

  export default Map