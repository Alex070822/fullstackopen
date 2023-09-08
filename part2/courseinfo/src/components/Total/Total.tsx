const Total = ({ parts }) => {
  return <p><strong>Total of {parts[0].exercises + parts[1].exercises + parts[2].exercises + parts[3].exercises} exercises</strong></p>;
};

export default Total;