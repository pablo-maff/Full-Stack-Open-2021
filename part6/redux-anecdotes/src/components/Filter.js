import { setFilter } from "../reducers/filterReducer"
import { useDispatch, useSelector } from "react-redux"
import AnecdoteList from "./AnecdoteList"


const Filter = () => {
  const filter = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const handleChange = event => {
    dispatch(setFilter(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter