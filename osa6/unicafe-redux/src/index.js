import React from "react"
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {

const good = () => {
 store.dispatch({
    type:'GOOD'
 })
}  
const ok= () => {
    store.dispatch({
       type:'OK'
    })
}
const bad = () => {
    store.dispatch({
       type:'BAD'
    })
}         
return(
    <div>
        <button onClick={good}>good</button>
        <button onClick={ok}>ok</button>
        <button onClick={bad}>bad</button>
        <p>good {store.getState().good}</p>
        <p>ok {store.getState().ok}</p>
        <p>bad {store.getState().bad}</p>
    </div>
)
}



const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)