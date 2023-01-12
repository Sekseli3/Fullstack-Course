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
       <Part name={part1} number={exercises1} />
       <Part name={part2} number={exercises2} />
       <Part name={part3} number={exercises3} />
      </div>
    )
  }
 const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.number}</p>
    </div>
  )
 }

  return (
    <div>
      <Header name={course} />
      <Contet/>
      <Total amount={exercises1 + exercises2 + exercises3 } />
    </div>
  )
}

export default App
