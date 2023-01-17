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
    number: 1
  },
  {
    text:'Adding manpower to a late software project makes it later!',
    number: 2
  },
  {
    text:'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    number: 3
  },
  {
    text:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    number: 4
  },
  {
    text:'Premature optimization is the root of all evil.',
    number: 5
  },
  {
    text:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    number: 6
  },
  {
    text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    number: 7
  },
  {
    text:'The only way to go fast, is to go well.',
    number: 8
  }
  ]
   
  const getAnecdote = () => {
    const pos = Math.floor((Math.random()*8)+0)
    setRandom(pos)
  }
  const [random, setRandom] = useState(0)

  return (
    <div>
      <Button click={getAnecdote} text= "randomiser"/>
      <p>{anecdotes[random].text}</p>
      <h1>{anecdotes[0].text}</h1>
    </div>
  );



}

export default App