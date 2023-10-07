const Filter = ({filterText, handleFilterChange}) => {

  return (
      <input type="text" value={filterText} onChange={handleFilterChange} />
  );
};

export default Filter;