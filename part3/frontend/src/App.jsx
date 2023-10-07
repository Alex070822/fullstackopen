import { useEffect, useState } from 'react';
import Filter from './components/Filter/Filter.jsx';
import PersonForm from './components/PersonForm/PersonForm.jsx';
import Persons from './components/Persons/Persons.jsx';
import personsService from './services/persons.jsx';
import Notification from "./components/Notification/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterText, setFilterText] = useState('');
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');

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
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personsService
        .update(existingPerson.id, updatedPerson)
        .then((updatedPerson) => {
          setPersons(
              persons.map((person) =>
                  person.id === existingPerson.id ? updatedPerson : person
              )
          );
          setNewName('');
          setNewNumber('');
          setNotification(`Updated ${newName}'s number`);
          setNotificationType("notification");
          setTimeout(() => {
            setNotification('');
            setNotificationType('');
          }, 5000);
        })
        .catch(() => {
          setNotification(`Information of ${newName} has already been removed from server`);
          setNotificationType("error");
          setTimeout(() => {
            setNotification('');
            setNotificationType('');
          }, 5000);
          setPersons(persons.filter(person => person.id !== existingPerson.id));
        });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      personsService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setNewName('');
        setNewNumber('');
        setNotification(`Added ${newName}`);
        setNotificationType("notification");
        setTimeout(() => {
          setNotification('');
          setNotificationType('');
        }, 5000);
      })
      .catch((error) => {
        console.error('Error adding person:', error);
      });
    }
  };

  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personsService
      .deleteObject(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        console.error(`Error deleting ${name}`, error);
      });
    }
  };

  useEffect(() => {
    personsService.getAll()
    .then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={notification} notificationType={notificationType}/>
        <Filter filterText={filterText} handleFilterChange={handleFilterChange} />
        <h3>add a new</h3>
        <PersonForm
            handleSubmit={handleSubmit}
            newName={newName}
            handleNewName={handleNewName}
            newNumber={newNumber}
            handleNewNumber={handleNewNumber}
        />
        <h3>Numbers</h3>
        <Persons persons={persons} filterText={filterText} handleDelete={handleDelete}/>
      </div>
  );
};

export default App;