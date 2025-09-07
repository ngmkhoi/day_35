import React from "react";
import styles from './Weather.module.scss';
import { Sun, Cloudy, CloudRain, Wind, Droplets } from 'lucide-react';

// Dữ liệu mẫu
const initialWeatherData = {
    hanoi: { city: "Hà Nội", temp: 28, weather: "Nắng", humidity: 65, wind: 10 },
    hcm: { city: "TP.HCM", temp: 32, weather: "Nhiều mây", humidity: 78, wind: 15 },
    danang: { city: "Đà Nẵng", temp: 26, weather: "Mưa rào", humidity: 82, wind: 20 }
};

// Component Icon tương ứng với thời tiết
const WeatherIcon = ({ weather }) => {
    switch (weather) {
        case 'Nắng': return <Sun size={80} strokeWidth={1.5} />;
        case 'Nhiều mây': return <Cloudy size={80} strokeWidth={1.5} />;
        case 'Mưa rào': return <CloudRain size={80} strokeWidth={1.5} />;
        default: return <Cloudy size={80} strokeWidth={1.5} />;
    }
};

function WeatherApp() {
    const [weatherData, setWeatherData] = React.useState(initialWeatherData);
    const [selectedCity, setSelectedCity] = React.useState('hanoi');
    const [loading, setLoading] = React.useState(false);

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    const handleRefresh = () => {
        setLoading(true);
        // Giả lập việc fetch dữ liệu mới
        setTimeout(() => {
            setWeatherData(prevData => ({
                ...prevData,
                [selectedCity]: {
                    ...prevData[selectedCity],
                    temp: prevData[selectedCity].temp + Math.floor(Math.random() * 7) - 3,
                    humidity: Math.max(20, Math.min(100, prevData[selectedCity].humidity + Math.floor(Math.random() * 11) - 5)),
                    wind: Math.max(5, prevData[selectedCity].wind + Math.floor(Math.random() * 7) - 3)
                }
            }));
            setLoading(false);
        }, 500);
    };

    const currentWeather = weatherData[selectedCity];

    // Lấy class theme dựa trên thời tiết
    const getWeatherTheme = (weather) => {
        if (weather.includes('Nắng')) return styles.sunny;
        if (weather.includes('Mưa')) return styles.rainy;
        if (weather.includes('mây')) return styles.cloudy;
        return styles.cloudy;
    };

    return (
        // Sử dụng object `styles` và thêm class theme động
        <div className={`${styles.weatherCard} ${getWeatherTheme(currentWeather.weather)} ${loading ? styles.loading : ''}`}>
            <div className={styles.header}>
                <select value={selectedCity} onChange={handleCityChange}>
                    {Object.keys(weatherData).map(cityKey => (
                        <option key={cityKey} value={cityKey}>
                            {weatherData[cityKey].city}
                        </option>
                    ))}
                </select>
                <button onClick={handleRefresh} className={styles.refreshButton} aria-label="Làm mới">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6"/><path d="M22 11.5A10 10 0 0 0 3.5 12.5"/><path d="M2 12.5a10 10 0 0 0 18.5-1"/></svg>
                </button>
            </div>

            <div className={styles.weatherInfo}>
                <div className={styles.mainIcon}>
                    <WeatherIcon weather={currentWeather.weather} />
                </div>
                <p className={styles.city}>{currentWeather.city}</p>
                <h1 className={styles.temperature}>{currentWeather.temp}°C</h1>
                <p className={styles.description}>{currentWeather.weather}</p>
            </div>

            <div className={styles.details}>
                <div className={styles.detailItem}>
                    <Droplets size={20} />
                    <span>{currentWeather.humidity}%<br/><small>Độ ẩm</small></span>
                </div>
                <div className={styles.detailItem}>
                    <Wind size={20} />
                    <span>{currentWeather.wind} km/h<br/><small>Gió</small></span>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;