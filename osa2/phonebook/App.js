import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , id:0}
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      id: persons.length,
    }
  
    setPersons(persons.concat(noteObject))
    console.log(persons)
    setNewName('')
    
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:<input
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
        {persons.map(person =>(
          <div key={person.id}>{person.name}
          </div>
        ))}
        
    </div>
  )

}

export default App