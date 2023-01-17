import { useState } from 'react'

const Statistics = (props) =>{
  return (
  <div>
   <p>{props.bad}
   {props.neutral}
   {props.good}
   {props.all}
   {props.average}
   {props.positive}</p>
  </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  
  
  

  return (
    <div>
      <h1>Give Feedback!</h1>
      <p>Rate here!</p>
      <button onClick={() => setGood(good+1)}>
        good
        </button>
        <button onClick={() => setNeutral(neutral+1)}>
        neutral
        </button>
        <button onClick={() => setBad(bad+1)}>
        neutral
        </button>
      
      <Statistics good ={"good "+ good}/>
      <Statistics neutral ={"neutral "+ neutral}/>
      <Statistics bad =  {"bad "+ bad}/>
      <Statistics all = {"All "+ (bad+neutral+good)}/>
      <Statistics average = {"Average "+ ((bad*-1+good*1)/((bad+neutral+good)))}/>
      <Statistics positive = {"Positive "+ (100*good/(bad+neutral+good))+"%"}/>
    </div>
    
  )
}

export default App