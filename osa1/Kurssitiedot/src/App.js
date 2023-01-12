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
        <p>{props.name1} {props.number1}</p>
        <p>{props.name2} {props.number2}</p>
        <p>{props.name3} {props.number3}</p>
      </div>
    )
  }


  return (
    <div>
      <Header name={course} />
      <Contet name1={part1} number1={exercises1} name2={part2} number2={exercises2} name3={part3} number3={exercises3}  />
      <Total amount={exercises1 + exercises2 + exercises3 } />
    </div>
  )
}

export default App
