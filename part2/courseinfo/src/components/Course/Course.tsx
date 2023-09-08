import Header from "../Header/Header";
import Content from "../Content/Content";
import Total from "../Total/Total";

const Course = ({courses}) => {

  return (
      <div>
        <h1>Web development curriculum</h1>
        {courses.map((course) => (
            <div key={course.id}>
              <Header course={course.name} />
              <Content parts={course.parts} />
              <Total parts={course.parts} />
            </div>
        ))}
      </div>
  );
};

export default Course;