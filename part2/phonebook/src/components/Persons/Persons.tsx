const Persons = ({persons, filterText}) => {

  const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
      <>
        {filteredPersons.map((person) => (
            <div key={person.name}>{person.name} {person.number}</div>
        ))}
      </>
  );
};

export default Persons;