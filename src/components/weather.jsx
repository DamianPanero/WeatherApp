import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import { useEffect, useRef, useState } from 'react'

export default function Weather(){
    const [weatherData, setWeatherData]=useState(false);
    const inputRef=useRef("");

    const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":cloud_icon,
        "04n":cloud_icon,
        "09d":drizzle_icon,
        "09n":drizzle_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "11d":rain_icon,
        "11n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon
    }

    const search=async(city)=>{
        try {
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}`
            const res=await fetch(url);
            const data=await res.json();
            console.log(data);
            const icon=allIcons[data.weather[0].icon];
            setWeatherData({
                "humidity":data.main.humidity,
                "location":data.name,
                "temperature":Math.floor(data.main.temp),
                "windSpeed":data.wind.speed,
                "icon":icon,
            })

        } catch (error) {
            
        }
    }

    useEffect(()=>{
        search("rosario")
    },[])

    const handleKeyPress=(e)=>{
        if(e.key==="Enter"){
            search(inputRef.current.value)
        }
    }

    return(
        <div className="weather">
            <div className="search-bar">
                <input type="text" placeholder="Search" ref={inputRef} onKeyDown={handleKeyPress}/>
                <img src={search_icon} alt='search' onClick={()=>search(inputRef.current.value)}/>
            </div>
              <img src={weatherData.icon} alt='weather-icon' className='weather-icon'/>
              <p className='temperature'>{weatherData.temperature}ºC</p>
              <p className='location'>{weatherData.location}</p>
              <div className='weather-data'>
              <div className='col'>
                <img src={humidity_icon} alt='humidity'/>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
              <div className='col'>
                <img src={wind_icon} alt='wind'/>
                <p>{weatherData.windSpeed} Km/hs</p>
                <span>Wind Speed</span>
              </div>
            </div>
        </div>
    )
}