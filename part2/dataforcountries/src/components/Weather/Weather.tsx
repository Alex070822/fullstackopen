import {useEffect} from "react";
import weatherService from '../../services/weather'

const Weather = ({ country, weatherInfo, setWeatherInfo, filterText, filteredCountries, weatherApiCall, setWeatherApiCall }) => {

  useEffect(() => {
    if (filteredCountries.length === 1 && !weatherApiCall) {
      weatherService.getWeather(country.capital, country.cca2)
      .then((currentWeather) => {
        setWeatherInfo(currentWeather);
      });
    }
  }, []);

  useEffect(() => {
    if (weatherApiCall && filteredCountries.length !== 1) {
      setWeatherApiCall(false);
    }
  }, [filterText]);

  return (
      <>
        <h2>Weather in {country.capital}</h2>
        {weatherInfo && weatherInfo.main && weatherInfo.weather && weatherInfo.weather[0] && weatherInfo.wind ? (
            <>
              <div>temperature {weatherInfo.main.temp} Celsius</div>
              <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt="weather icon"/>
              <div>wind {weatherInfo.wind.speed} m/s</div>
            </>
            )
            : null}
      </>
  );
};

export default Weather;