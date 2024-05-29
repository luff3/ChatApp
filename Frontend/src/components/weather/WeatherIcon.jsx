import React from 'react';
import { Link } from 'react-router-dom';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from 'weather-icons-react'; // Ви можете використовувати будь-які іконки погоди

const WeatherIcon = ({ weather }) => {
  const renderWeatherIcon = () => {
    switch (weather) {
      case 'sunny':
        return <WiDaySunny size={24} color="#FFA500" />;
      case 'cloudy':
        return <WiCloud size={24} color="#6b7280" />;
      case 'rainy':
        return <WiRain size={24} color="#3b82f6" />;
      case 'snowy':
        return <WiSnow size={24} color="#9ca3af" />;
      case 'thunderstorm':
        return <WiThunderstorm size={24} color="#ef4444" />;
      default:
        return <WiDaySunny size={24} color="#f59e0b" />;
    }
  };

  return (
    <div className="fixed top-2 right-2 flex items-center p-2 rounded-full shadow-lg">
      <Link to={'/weather'}> {renderWeatherIcon()} </Link>
    </div>
  );
};

export default WeatherIcon;
