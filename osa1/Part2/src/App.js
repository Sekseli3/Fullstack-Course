const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Total = (props) => {
    return (
      <div>
          <p>Number of excercises {props.amount}</p>
      </div>
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
        <p>{props.name} {props.number}</p>
      </div>
    )
  }


  return (
    <div>
      <Header name={course} />
      <Contet name={part1} number={exercises1} />
      <Contet name={part2} number={exercises2} />
      <Contet name={part3} number={exercises3} />
      <Total amount={exercises1 + exercises2 + exercises3 } />
    </div>
  )
}

export default App
