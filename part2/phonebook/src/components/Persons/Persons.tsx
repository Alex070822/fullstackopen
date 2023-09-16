import personsService from '../../services/persons';

const Persons = ({persons, filterText, setPersons}) => {

  const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filterText.toLowerCase())
  );

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

  return (
      <>
        {filteredPersons.map((person) => (
            <div key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person.name, person.id)}>delete</button></div>
        ))}
      </>
  );
};

export default Persons;