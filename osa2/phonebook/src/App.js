import axios from 'axios'
import { useEffect, useState } from 'react'
import Notification from './components/Notification'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'
import noteService from './services/persons'
import DeletePersons from './components/DeletePerson'



const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter,setNewFilter] = useState('')
  const [notificationToggle, setNotificationToggle] = useState(false)
  const [notificationText, setNotificationText] = useState('')
  const [notificationName, setNotificationName] = useState()
  const [notificationStyle, setNotificationStyle] = useState('notification')

  const createNotification = (name, style, text) => {
    setNotificationStyle(style)
    setNotificationText(text)
    setNotificationName(name)
    if (!notificationToggle)
      setNotificationToggle(!notificationToggle)
    setTimeout(() => {
      setNotificationToggle(false)
    }, 5000)
  }
  
useEffect(() => {
  axios
    .get('http://localhost:3001/persons')
    .then((response)=> {setPersons(response.data)})
},[])


const deletePerson = (id, name) => {
  if (window.confirm(`Delete ${name}?`)) {
    noteService.remove(id).then((response) => {
      const notDeleted = persons.filter((person)=>person.id !== id);
      setPersons(notDeleted)
      createNotification(name, 'notification', 'Successfully deleted ')
    })
  }
}







 

  
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
    const noteObject = {
      name: newName,
      number: newNumber,
      id: persons.lenght,
    }
    if(persons.map(p => p.name).includes(newName)) updatedPerson(newName,newNumber)

    else {
    setPersons(persons.concat(noteObject))
    console.log(persons)
    

    noteService
    .create(noteObject)
    .then(response => {
      setPersons(persons.concat(response))
    setNewName('')
    setNewNumber('')
    createNotification(noteObject.name, 'notification', 'Added ')
  })
}
  }

const updatedPerson = (name, newNumber) => {
  const oldPerson = persons.find(p => p.name === name)
  const changedPerson = { ...oldPerson, number: newNumber }
  if (window.confirm(`${name} is allready added to phonebook, replace the old number with a new one?`)){
    noteService
    .update(oldPerson.id, changedPerson).then(returnedPerson => {
      setPersons(persons.map(person => person.id !== oldPerson.id ? person : returnedPerson))
      createNotification(oldPerson.name, 'notification', 'Updated ')
    })
    .catch(_error => {
      createNotification(oldPerson.name, 'warning', 'This person was already deleted from the phonebook: ')
    })
  }
}

  
  return (
    <div>
       <h2>Phonebook</h2>
       {notificationToggle && (
        <Notification text={notificationText} name={notificationName} style={notificationStyle}/>
      )}
    <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
    <h2>Add a new</h2>
    <AddPerson addPerson={addPerson} handleNameChange={handleNameChange} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
    
  <DeletePersons personsToShow={persons} deletePerson={deletePerson} newFilter = {newFilter}/>
    </div>
  )  
}

export default App