import { useState } from 'react'
import Filter from "./components/Filter/Filter";
import PersonForm from "./components/PersonForm/PersonForm";
import Persons from "./components/Persons/Persons";

interface Person {
  name: string;
  number: string;
  id: number;
}

const App = () => {
  const [persons, setPersons] = useState<Person[]>([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('');

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else if (persons.some((person) => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
    } else {
      setPersons((prevPersons: Person[]) => [
        ...prevPersons,
        { name: newName, number: newNumber, id: persons.length + 1 }
      ]);
      setNewName('');
      setNewNumber('');
    }
  };

  return (
      <div>
        <h2>Phonebook</h2>
        <Filter filterText={filterText} handleFilterChange={handleFilterChange}/>
        <h3>add a new</h3>
        <PersonForm handleSubmit={handleSubmit} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
        <h3>Numbers</h3>
        <Persons persons={persons} filterText={filterText}/>
      </div>
  )
}

export default App