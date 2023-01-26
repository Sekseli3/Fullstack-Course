import { useState, useEffect } from "react"
import axios from "axios"
import CountriesList from "./components/countrieslist"
import Country from "./components/country"

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then((response) => {setCountries(response.data)})
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCountriesToShow(countries.filter((country) =>
        country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
  }

  return (
    <div>
      <div>
        find countries:<input
        value={filter}
        onChange={handleFilterChange}/>
      </div>
      {countriesToShow.length === 1 ? 
        <Country country={countriesToShow[0]} />
        : null}
      {countriesToShow.length > 10 ? 
        <h3>Too many matches, specify another filter</h3>
        :<CountriesList countriesToShow={countriesToShow} setShow={setCountriesToShow}/>
      }
    </div>
  )
}
export default App;