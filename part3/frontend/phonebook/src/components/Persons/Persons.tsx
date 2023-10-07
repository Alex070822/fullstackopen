const Persons = ({ persons, filterText, handleDelete }) => {
  const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
      <>
        {filteredPersons.map(person => (
            <div key={person.name}>
              {person.name} {person.number}{' '}
              <button onClick={() => handleDelete(person.name, person.id)}>
                delete
              </button>
            </div>
        ))}
      </>
  );
};


export default Persons;