const CountryInfo = ({country}) => {

  return (
      <>
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
      </>
  );
};

export default CountryInfo;