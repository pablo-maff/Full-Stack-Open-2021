import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Select from 'react-select'
import { useState } from 'react'

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)

  const result = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks

  // Use a set to only have unique values
  const uniqueGenres = new Set()
  books.map((b) => uniqueGenres.add(...b.genres))
  // To transform set into a suitable array use the spread operator
  const options = [...uniqueGenres]
    .map((g) => ({ value: g, label: g }))
    .concat({ value: null, label: 'All Books' })

  const filteredBooks = genre
    ? books.filter((b) => b.genres.includes(genre))
    : books

  return (
    <div>
      <h2>books</h2>
      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {filteredBooks.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>filter by genre</h3>
        <Select
          defaultValue={null}
          onChange={(options) => setGenre(options.value)}
          options={options}
        />
      </div>
    </div>
  )
}

export default Books
