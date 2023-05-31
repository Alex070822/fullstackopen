import React from "react";

const StatisticLine = ({ label, total }) => {
  return (
      <tbody>
      <tr>
        <td>{label}</td>
        <td>{total}</td>
      </tr>
      </tbody>
  );
};

export default StatisticLine;