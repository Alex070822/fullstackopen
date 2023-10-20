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
        .catch((error) => {
          if (error.response.status === 400) {
            setNotification(error.response.data.error);
            setNotificationType("error");
          } else if (error.response.status === 404) {
            setNotification(`Information of ${newName} has already been removed from the server`);
            setNotificationType("error");
            setPersons(persons.filter(person => person.id !== existingPerson.id));
          }
          setTimeout(() => {
            setNotification('');
            setNotificationType('');
          }, 5000);
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
        setNotification(error.response.data.error);
        setNotificationType("error");
        setTimeout(() => {
          setNotification('');
          setNotificationType('');
        }, 5000);
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
        setNotification(`Error deleting ${name}: ${error}`);
        setNotificationType("error");
        setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
        setTimeout(() => {
          setNotification('');
          setNotificationType('');
        }, 5000);
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