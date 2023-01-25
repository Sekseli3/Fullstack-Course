const Country = ({ country }) => {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital: {country.capital}</div>
        <div>Area: {country.area}</div>
        <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
        <img src={country.flags.png} alt={country.name.common} style = {{width: "20%"}} />
      </div>
    )
  }
  
  export default Country;