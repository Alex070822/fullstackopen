const Total = ({ parts }) => {
  const totalExercises = parts.reduce((total, part) => total + part.exercises, 0);
  return <p><strong>Total of {totalExercises} exercises</strong></p>;
};

export default Total;