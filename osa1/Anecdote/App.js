import { useState } from 'react'
const Button = (props) => {
  return(
  <button onClick={props.click}>{props.text}</button>
  )
}

const App = () => {
  const anecdotes = [
    {
    text:'If it hurts, do it more often.',
    number: 0
  },
  {
    text:'Adding manpower to a late software project makes it later!',
    number: 0
  },
  {
    text:'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    number: 0
  },
  {
    text:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    number: 0
  },
  {
    text:'Premature optimization is the root of all evil.',
    number: 0
  },
  {
    text:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    number: 0
  },
  {
    text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    number: 0
  },
  {
    text:'The only way to go fast, is to go well.',
    number: 0
  }
  ]

  const [random, setRandom] = useState(0)
  const [points, setPoints] = useState(new Array(8).fill(0))
  
   
  const getAnecdote = () => {
    const num = Math.floor(Math.random()*8)
    setRandom(num)
  }

  
    const addVote = () => {
    const copy = [...points]
    ++copy[random]
    setPoints(copy)
  }
  const index = points.indexOf(Math.max(...points))

  return (
    <div>
      <Button click={getAnecdote} text= "next anecdote"/>
      <Button click={addVote} text = "vote" />
      <h2>Anecdote</h2>
      <p>{anecdotes[random].text}</p>
      <h3>Votes</h3>
      <p>{points[random]}</p>
      <h3>Anecdote with most votes</h3>
      <p>{anecdotes[index].text} with {points[index]} votes</p>
    </div>
  );



}

export default App