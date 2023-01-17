import { useState } from 'react'
const StatisticsLine = (props) => (
  <tr>
   <td> {props.bad}</td>
   <td>{props.neutral}</td>
   <td> {props.good}</td>
   <td> {props.all}</td>
   <td> {props.average}</td>
   <td> {props.positive}</td>
   <td> {props.text}{props.value}</td>
  </tr>
)

const Statistics = (props) =>{
  return (
  <tbody>
   
      <StatisticsLine text =" good: " value ={props.good}/>
      <StatisticsLine text =" neutral: " value ={props.neutral}/>
      <StatisticsLine text =" bad:  " value ={props.bad}/>
      <StatisticsLine text = "All: " value = {(props.bad+props.neutral+props.good)}/>
      <StatisticsLine text = "Average " value = {((props.bad*-1+props.good*1)/((props.bad+props.neutral+props.good))).toFixed(1)}/>
      <StatisticsLine text =  "Positive " value = {((100*props.good/(props.bad+props.neutral+props.good))).toFixed(1)+"%"}/>
      
    </tbody>
  )
}
const Button = (props) => (
  <button onClick={props.click}>{props.text}</button>
)


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  
  if(good > 0 || neutral >0 || bad >0 ){
  return (
    <div>
      <h1>Give Feedback!</h1>
      <p>Rate here!</p>

      <Button click={() => setGood(good+1)} text = "Good" /> 
      <Button click={() => setNeutral(neutral+1)} text = "Neutral" /> 
      <Button click={() => setBad(bad+1)} text = "Bad" />  

    
        <h1>Statistics</h1>
        <table>
        
        <Statistics good={good}neutral={neutral} bad={bad}/>
        
        </table>
        
    </div>
    )


} if(good <= 0 && neutral <= 0 && bad <=0 ) {
  return(
  <div>
    <h1>Give Feedback!</h1>
      <p>Rate here!</p>
      <p>No feedback given!</p>
      <Button click={() => setGood(good+1)} text = "Good" /> 
      <Button click={() => setNeutral(neutral+1)} text = "Neutral" /> 
      <Button click={() => setBad(bad+1)} text = "Bad" />  
    </div>
  )
}
}
export default App