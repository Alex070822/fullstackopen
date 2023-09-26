const Countries = ({ countries, filterText }) => {
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
                    <h1>{country.name.common}</h1>
                    <div>capital {country.capital}</div>
                    <div>area {country.area}</div>
                    <h4>languages:</h4>
                    <ul>
                      {Object.entries(country.languages).map(([code, language]) => (
                          <li key={code}>{language}</li>
                      ))}
                    </ul>
                    <img src={country.flags.png} alt={`${country.name.common} flag`}/>
                  </div>
              ))}
            </>
        ) : (
            <>
              {filteredCountries.map(country => (
                  <div key={country.name.common}>{country.name.common}</div>
              ))}
            </>
        )}
      </>
  );
};


export default Countries;