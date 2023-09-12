import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName }]);
      setNewName('');
    }
  };

  return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={handleSubmit}>
          <div>
            name: <input type="text" value={newName} onInput={handleNewName}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {persons.map((person) => (
            <div key={person.name}>{person.name}</div>
        ))}
      </div>
  )
}

export default App