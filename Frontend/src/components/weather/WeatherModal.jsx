import React, { useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from 'weather-icons-react';
import { Link } from 'react-router-dom';

const WeatherComponent = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      setError('');
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1ea188574388ab52183fcadac977758a&units=metric`);
      setWeather(response.data);
    } catch (error) {
      setError('City not found');
      setWeather(null);
    }
  };

  const renderWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clear':
        return <WiDaySunny size={96} color="#f59e0b" />;
      case 'Clouds':
        return <WiCloud size={96} color="#6b7280" />;
      case 'Rain':
        return <WiRain size={96} color="#3b82f6" />;
      case 'Snow':
        return <WiSnow size={96} color="#9ca3af" />;
      case 'Thunderstorm':
        return <WiThunderstorm size={96} color="#ef4444" />;
      default:
        return <WiDaySunny size={96} color="#f59e0b" />;
    }
  };

  return (
    <div className="hero h-2/2 bg-base-200 flex items-center justify-center lg:w-1/2 rounded-lg"> 

    
  <div className="hero-content flex-col lg:flex-row w-full max-w-2xl overflow-y-auto">
    <Link to={'/'}>
    <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" alt="Weather" />

    </Link>
    
    <div className="lg:ml-8 relative" rounded-lg> 
      <h1 className="text-5xl font-bold text-center">Weather</h1>
      <p className="py-6">Enter a city name to get the current weather information.</p>
      <div className="py-4">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
        <button onClick={fetchWeather} className="btn btn-primary w-full">Get Weather</button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {weather && (
          <div className="mt-4 flex flex-col items-center">
            {renderWeatherIcon(weather.weather[0].main)}
            <p className="text-2xl mt-2">{weather.name}</p>
            <p className="text-xl">{weather.main.temp}°C</p>
            <p className="text-lg">{weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  </div>
</div>


  );
};

export default WeatherComponent;
