import { useDispatch } from 'react-redux'
import { filterState } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = event => {
    const {
      target: { value },
    } = event

    dispatch(filterState(value))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter