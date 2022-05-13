import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = ({ show }) => {
  const me = useQuery(ME)
  const books = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (books.loading || me.loading) {
    return <div>loading...</div>
  }

  const favouriteGenre = me.data.me.favouriteGenre
  const recommendations = books.data.allBooks.filter((b) =>
    b.genres.includes(me.data.me.favouriteGenre)
  )
  return (
    <>
      <h2>Recommendations</h2>
      <p>
        Books in your favourite genre <strong>{favouriteGenre}</strong>
      </p>
      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {recommendations.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Recommend
