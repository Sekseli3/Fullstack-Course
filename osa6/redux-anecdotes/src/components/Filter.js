import { useDispatch } from 'react-redux'
import { createFilter } from '../reducers/filterReducer'



const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
      const newFilter = event.target.value
      dispatch(createFilter(newFilter))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input type="search" onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter