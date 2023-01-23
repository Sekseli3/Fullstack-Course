const DeletePersons = ({ personsToShow, deletePerson ,newFilter}) => {
    return (
      <div>
        {personsToShow.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map((person) => (
          <div key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => deletePerson(person.id, person.name)}>
              delete
            </button>
          </div>
        ))}
      </div>
    )
  }
  
  export default DeletePersons;