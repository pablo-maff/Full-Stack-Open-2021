import ReactDom from 'react-dom'
import App from './App'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

ReactDom.render(
  <App />,
  document.getElementById('root')
)