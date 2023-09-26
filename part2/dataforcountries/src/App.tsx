import { useEffect, useState } from 'react';
import countriesService from '../src/services/countries';
import Filter from "./components/Filter/Filter";
import Countries from "./components/Countries/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
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
      <Countries countries={countries} filterText={filterText}/>
    </>
  )
}

export default App
