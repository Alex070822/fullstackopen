import CountryInfo from "../CountryInfo/CountryInfo";
import Weather from "../Weather/Weather";

const Countries = ({ countries, filterText, countryDetails, toggleCountryDetails, weatherInfo, setWeatherInfo, weatherApiCall, setWeatherApiCall}) => {
  const filteredCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
      <>
        {filteredCountries.length > 10 ? (
            <div>Too many matches, specify another filter</div>
        ) : filteredCountries.length === 1 ? (
            <>
              {filteredCountries.map(country => (
                  <div key={country.name.common}>
                    <CountryInfo country={country}/>
                    <Weather {...{
                      country,
                      weatherInfo,
                      setWeatherInfo,
                      filterText,
                      filteredCountries,
                      weatherApiCall,
                      setWeatherApiCall
                    }} />
                  </div>
              ))}
            </>
        ) : (
            <>
              {filteredCountries.map(country => (
                  <div key={country.name.common}>{country.name.common}{' '}
                    <button onClick={() => toggleCountryDetails(country.name.common)}>
                      {countryDetails[country.name.common] ? 'hide' : 'show'}
                    </button>
                    {countryDetails[country.name.common] ? <CountryInfo country={country} /> : null}
                  </div>
              ))}
            </>
        )}
      </>
  );
};

export default Countries;