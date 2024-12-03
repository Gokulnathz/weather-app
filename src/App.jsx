


import { Button } from 'react-bootstrap';
import './App.css';
import clear_icon from './assets/clear-sky.png';
import cloudy_icon from './assets/cloudy.png';
import humidity_icon from './assets/humidity.png';
import rain_icon from './assets/Rain.png';
import wind_icon from './assets/wind.png';
import { useEffect, useRef, useState } from 'react';






function App() {
  const inputRef= useRef()
 const [weatherData, setWeatherData]=useState(false);
 const allIcons={
  "01d":clear_icon,
  "01n":clear_icon,
  "02d":cloudy_icon,
  "03d":cloudy_icon,
  "04d":humidity_icon,
  "04n":humidity_icon,
  "09d":rain_icon,
  "09n":rain_icon,
  "10d":rain_icon,
  "10n":rain_icon,
  "13d": wind_icon,
  "13n": wind_icon
 } 
 const search= async(city)=>{
  if(city==="")
  {
    alert("Enter a city");
    return
  }
    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon =allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({humidity: data.main.humidity,
      windSpeed:data.wind.speed,
      temperature: Math.floor(data.main.temp),
      location: data.name,  
      icon:icon
      })
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    search("new york")
  },[])

  return (
    <>
      <div className="weather">
      <div className="header">
        <center><h1>Weather Forecast <img className='logo' src="/src/assets/Header.gif" alt="cloud" /></h1>
        </center>
        
      </div>
      <div className="weatherTable">
          <div className="searchBar mb-3">
          <input className='city' ref={inputRef} type="text" placeholder='Enter a city' />
          <Button className='rounded-circle bg-transparent border-0'><i className="fa-solid fa-magnifying-glass" onClick={()=>search(inputRef.current.value)}></i></Button>
          </div>
            <center>
              <img src={weatherData.icon} className='clear_icon'/>
            <p className='temperature'>{weatherData.temperature}°</p>
            <p className='location'>{weatherData.location}</p>
            </center>
            
            <div className="weatherData">
              <div className="col">
                <img src={humidity_icon} className='humidity_icon'/>
                <div>
                  <p>{weatherData.humidity}</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <img src={wind_icon} className='wind_icon'/>
                <div>
                  <p>{weatherData.windSpeed}km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
              </div>       
        </div>
      </div>
        
     
    </>
  )
}

export default App
