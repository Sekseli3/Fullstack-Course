import axios from 'axios'
import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'
import noteService from './services/persons'
import DeletePersons from './components/DeletePerson'



const App = () => {

useEffect(() => {
  axios
    .get('http://localhost:3001/persons')
    .then((response)=> {setPersons(response.data)})
},[])

const deletePerson = (id, name) => {
  if (window.confirm(`Delete ${name}?`)) {
    noteService.remove(id).then((response) => {
      const updatedPersons = persons.filter((person) => person.id !== id);
      setPersons(updatedPersons);
      
    })
  }
}


  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter,setNewFilter] = useState('')
  const [newFilteredPersons,setFilteredPersons] = useState([])
  
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
    setFilteredPersons(persons)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(p => p.name).includes(newName)) alert(newName+' is allready in the phonebook')
    else {
    const noteObject = {
      name: newName,
      id: persons.length+1,
      number: newNumber,
    }
    setPersons(persons.concat(noteObject))
    console.log(persons)
    

    noteService
    .create(noteObject)
    .then(response => {
      setPersons(persons.concat(response))
    setNewName('')
    setNewNumber('')
    })
}
  }
  
  return (
    <div>
       <h2>Phonebook</h2>
    <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
    <AddPerson addPerson={addPerson} handleNameChange={handleNameChange} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
    
  <DeletePersons personsToShow={persons} deletePerson={deletePerson} newFilter = {newFilter}/>
    </div>
  )  
}

export default App