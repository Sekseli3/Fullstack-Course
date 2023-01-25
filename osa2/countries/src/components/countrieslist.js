const CountriesList = ({ countriesToShow ,setShow}) => {
    return (
      countriesToShow.map((country) => (
        <div key={country.name.common}>
        {country.name.common}{" "}
         <button onClick={() => setShow([country])}>show</button>
        </div>
      ))
    )
  }
  export default CountriesList;