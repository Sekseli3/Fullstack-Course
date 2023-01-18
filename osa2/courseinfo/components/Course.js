const Course = ({course}) =>{
    return(
      <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts = {course.parts}/>
      </div>
    )
   
  }
  const Header = ({ name }) => {
    return(
      <h2>{name}</h2>
    )
   }
   const Content = ({parts}) => {
    return(
    <div>
    {parts.map(part => (
    <Part key ={part.id} name={part.name} exercises={part.exercises}/>))}
    </div>
    )
    }
  const Part = ({name, exercises}) => {
    return(
      <p>
        {name} {exercises}
      </p>
    )
  }
  
  
  const Total = ({parts}) => {
     const sum =parts.map(part => part.exercises).reduce(
      (accumulator,currentValue) => accumulator + currentValue
     );
    return(
      <div>
      <h3>Total of {sum} points</h3>
      </div>
    )
  }
  export default Course