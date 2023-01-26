import Weather from "./weather";
const Country = ({ country }) => {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital: {country.capital}</div>
        <div>Area: {country.area}</div>
        <h3>Spoken languages</h3>
        <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>))}
      </ul>
        <img src={country.flags.png} alt={country.name.common} style = {{width: "20%"}} />
        <Weather city={country.capital}/>
      </div>
    )
  }
  
  export default Country;