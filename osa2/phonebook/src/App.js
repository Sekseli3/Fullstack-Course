import axios from 'axios'
import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'


const App = () => {

useEffect(() => {
  axios
    .get('http://localhost:3001/persons')
    .then((response)=> {setPersons(response.data)})
},[])

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter,setNewFilter] = useState('')
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(p => p.name).includes(newName)) alert(newName+' is allready in the phonebook')
    else {
    const noteObject = {
      name: newName,
      id: persons.length,
      number: newNumber,
    }
    setPersons(persons.concat(noteObject))
    console.log(persons)
    setNewName('')
    setNewNumber('')
  }
  }

  


  return (
    <div>
       <h2>Phonebook</h2>
    <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
    <AddPerson addPerson={addPerson} handleNameChange={handleNameChange} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
    <Persons newFilter={newFilter} persons={persons}/>
    </div>
  )  
}

export default App