import axios from "axios";
const apiKey = import.meta.env.VITE_OPEN_WEATHER_KEY
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=`

const getWeather = (capital, countryCode) => {
  const request = axios.get(`${baseUrl}${capital},${countryCode}&units=metric&appid=${apiKey}`);
  return request.then(response => response.data);
}

export default {
  getWeather,
}