import { useEffect, useState } from 'react';
import countriesService from '../src/services/countries';
import Filter from "./components/Filter/Filter";
import Countries from "./components/Countries/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [countryDetails, setCountryDetails] = useState({});
  const [weatherInfo, setWeatherInfo] = useState ({});
  const [weatherApiCall, setWeatherApiCall] = useState (false);

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const toggleCountryDetails = (countryName) => {
    setCountryDetails(prevDetails => ({
      ...prevDetails,
      [countryName]: !prevDetails[countryName] || false,
    }));
  };

  useEffect(() => {
    countriesService.getAll()
    .then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  return (
    <>
      <Filter filterText={filterText} handleFilterChange={handleFilterChange} />
      <Countries {...{
        countries,
        filterText,
        countryDetails,
        toggleCountryDetails,
        weatherInfo,
        setWeatherInfo,
        weatherApiCall,
        setWeatherApiCall
      }}/>
    </>
  )
}

export default App;
