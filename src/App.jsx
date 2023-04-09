import {
  useState,
  useEffect
} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import bgPatternDesktop from '../images/pattern-bg-desktop.png'
import bgPatternMobile from '../images/pattern-bg-mobile.png'

import './App.css'

function App() {
  const [ipAddress, setIpAddress] = useState('')
  const [location, setLocation] = useState('')
  const [timeZone, setTimeZone] = useState('')
  const [isp, setIsp] = useState('')

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
  
  const trackIp = () => {
    
    const inputValue = document.querySelector('#text-input').value

    let requestUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${inputValue}`

    fetchData(requestUrl)
  }

  const fetchData = async (url) => {
    try {
      const response = await fetch(url); // Replace with your API endpoint
      const jsonData = await response.json();
      setIpAddress(jsonData.ip)
      setLocation(jsonData.location.city)
      setTimeZone(`UTC ${jsonData.location.timezone}`)
      setIsp(jsonData.isp)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // useEffect(() => {
  //   fetchData(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`);
  // // }, [ipAddress, location, timeZone, isp]);

  useEffect(() => {
    fetchData(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`);
  }, []);

  return (
    <div className="App">
      <div className=" relative">
        <div className='absolute w-full left-1/2 -translate-x-1/2 text-center p-4 flex flex-col justify-center align-center gap-4'>
          <h1 className='font-medium text-white'>
            IP Address Tracker
          </h1>
          <form action="#">
          <div className="flex items-center rounded-lg overflow-hidden">
            <input type="text" id='text-input' className="flex-1 px-4 py-2 text-[16px] lg:text-[18px]" placeholder="Search for any IP address or domain" />
            <button onClick={trackIp} className="px-4 py-2 bg-very-dark-gray text-white" type="button">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          </form>
          <div className='flex flex-col justify-center items-center gap-4 p-4 bg-white rounded-lg'>
            <div>
              <Label title="IP ADDRESS"/>
              <Details value={ipAddress} />
            </div>
            <div>
              <Label title="LOCATION"/>
              <Details value={location} />
            </div>
            <div>
              <Label title="TIMEZONE"/>
              <Details value={timeZone} />
            </div>
            <div>
              <Label title="ISP"/>
              <Details value={isp} />
            </div>
          </div>
        </div>
        <picture>
          <source srcSet={bgPatternDesktop} media="(min-width: 768px)"/>
          <img src={bgPatternMobile} alt="background pattern" />
        </picture>
      </div>
    </div>
  )
}

export default App
