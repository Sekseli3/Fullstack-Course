const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Total = (props) => {
    return (
          <p>Number of excercises {props.amount}</p>
    )
  }

  const Header = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    )
  }

  const Contet = (props) => {
    return (
      <div>
       <Part name={course.parts[0].name} number={course.parts[0].exercises} />
       <Part name={course.parts[1].name} number={course.parts[1].exercises} />
       <Part name={course.parts[2].name} number={course.parts[2].exercises} />
      </div>
    )
  }
 const Part = (props) => {
  return (
      <p>{props.name} {props.number}</p>
  )
 }

  return (
    <div>
      <Header name={course.name} />
      <Contet/>
      <Total amount={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises } />
    </div>
  )
}

export default App
