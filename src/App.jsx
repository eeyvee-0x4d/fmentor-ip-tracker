import {
  useState,
  useEffect,
  useRef
} from 'react'

import {
  MapContainer,
  TileLayer,
  Marker,
  ZoomControl,
  useMap
} from 'react-leaflet'

import L from 'leaflet'

import 'leaflet/dist/leaflet.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons'

import './App.css'

function App() {
  const [ipAddress, setIpAddress] = useState('')
  const [location, setLocation] = useState('')
  const [coordinatesLat, setCoordinatesLat] = useState('')
  const [coordinatesLng, setCoordinatesLng] = useState('')
  const [mapCenter, setMapCenter] = useState([0, 0])
  const [timeZone, setTimeZone] = useState('')
  const [isp, setIsp] = useState('')
  const [isLoading, setIsLoading] = useState('false')

  const Label = ({title}) => {
    return(
      <h2 className='text-dark-gray text-xs'>
        {title}
      </h2>
    )
  }

  const Details = ({value}) => {
    return(
      <p className='font-medium text-lg'>
        {value}
      </p>
    )
  }

  const API_KEY = import.meta.env.VITE_API_KEY;
  
  const trackIp = (e) => {
    e.preventDefault()
    
    const inputValue = document.querySelector('#text-input').value

    let requestUrl = ''
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
    const ipv6Regex = /^(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}$/
    const domainRegex = /^(?!:\/\/)(?:(?:(?:xn--)?[a-zA-Z0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u200C\u200D-]{1,63}\.)+(?:[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u200C\u200D-]{2,63}|xn--[\w-]{2,59})(?:\s|$))/

    if(ipv4Regex.test(inputValue) || ipv6Regex.test(inputValue)) {
      requestUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${inputValue}`
    }
    else if (domainRegex.test(inputValue)) {
      requestUrl = requestUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&domain=${inputValue}`
    }

    fetch(requestUrl)
      .then(res => {
        setIsLoading(true)
        return res.json()
      })
      .then(res => {
        console.log(res)
        setIpAddress(res.ip)
        setLocation(`${res.location.city} ${res.location.country}`)
        setTimeZone(`UTC ${res.location.timezone}`)
        setIsp(res.isp)
        setCoordinatesLat(res.location.lat)
        setCoordinatesLng(res.location.lng)
        setIsLoading(false)
      })
      .catch(error => {
        setIpAddress('Error')
        setLocation('Error')
        setTimeZone(`Error`)
        setIsp('Error')
        setIsLoading(false)
      })
  };

  useEffect(() => {
    setIsLoading(true)
    const fetchData = () => {
      
      fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`)
        .then(res => {
          setIsLoading(true)
          return res.json()
        })
        .then(res => {
          console.log(res)
          setIpAddress(res.ip)
          setLocation(`${res.location.city} ${res.location.country}`)
          setTimeZone(`UTC ${res.location.timezone}`)
          setIsp(res.isp)
          setCoordinatesLat(res.location.lat)
          setCoordinatesLng(res.location.lng)
          setIsLoading(false)
        })
        .catch(error => {
          setIpAddress('Error')
          setLocation('Error')
          setTimeZone(`Error`)
          setIsp('Error')
          setIsLoading(false)
        })
    };

    fetchData()  
  }, []);

  useEffect(() => {
    setMapCenter([coordinatesLat, coordinatesLng])
  }, [coordinatesLat, coordinatesLng])

  const customMarkerIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div className="App">
      <div className=" relative h-[300px] lg:h-[280px] bg-pattern-bg-mobile lg:bg-pattern-bg-desktop  bg-cover bg-center">
        <div className='absolute z-[999] w-full max-w-[480px] lg:max-w-full left-1/2 -translate-x-1/2 text-center px-4 py-8 flex flex-col justify-center align-center gap-8 lg:gap-14'>
          <h1 className='font-medium text-xl lg:text-2xl text-white'>
            IP Address Tracker
          </h1>
          <form action="#">
          <div className="flex items-center rounded-lg overflow-hidden lg:w-[500px] m-auto">
            <input type="text" id='text-input' className="flex-1 px-4 py-2 text-[16px] lg:text-[18px]" placeholder="Search for any IP address or domain" />
            <button onClick={trackIp} className="px-4 py-2 bg-very-dark-gray text-white" type="button">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          </form>
          <div className='flex flex-col lg:flex-row lg:divide-x justify-center lg:justify-between items-center gap-4 p-4 lg:p-8 bg-white rounded-lg text-center lg:text-left w-full lg:max-w-[700px] m-auto'>
            <div>
              <Label title="IP ADDRESS"/>
              {isLoading ? (<FontAwesomeIcon icon={faSpinner} className='animate-spin' />) :( <Details value={ipAddress} />)}
            </div>
            <div>
              <Label title="LOCATION"/>
              {isLoading ? (<FontAwesomeIcon icon={faSpinner} className='animate-spin' />) :( <Details value={location} />)}
            </div>
            <div>
              <Label title="TIMEZONE"/>
              {isLoading ? (<FontAwesomeIcon icon={faSpinner} className='animate-spin' />) :( <Details value={timeZone} />)}
            </div>
            <div>
              <Label title="ISP"/>
              {isLoading ? (<FontAwesomeIcon icon={faSpinner} className='animate-spin' />) :( <Details value={isp} />)}
            </div>
          </div>
        </div>
      </div>
      <MapContainer center={mapCenter} zoom={13} zoomControl={false} scrollWheelZoom={false} className='h-[400px] lg:h-[250px] overflow-hidden'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomleft" />
        <Marker position={mapCenter} icon={customMarkerIcon}>
        </Marker>
      </MapContainer>
     </div>
  )
}

export default App
