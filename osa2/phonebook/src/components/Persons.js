const Persons = ({newFilter, persons}) => {
    return(
        <div>
        {newFilter
            ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person =>
              <div key={person.id}>{person.name} {person.number}
              </div>)
              : persons.map(person => 
                <div key={person.id}>{person.name} {person.number}
              </div>)
          }
          </div>
    )
}

export default Persons