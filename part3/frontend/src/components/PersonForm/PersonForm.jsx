const PersonForm = ({handleSubmit, newName, handleNewName, newNumber, handleNewNumber}) => {

  return (
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" value={newName} onInput={handleNewName}/>
        </div>
        <div>number: <input type="tel" value={newNumber} onInput={handleNewNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  );
};

export default PersonForm;