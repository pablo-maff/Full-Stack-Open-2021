import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.notification.length >= 1) {
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
  }
  else return null
}

const mapStateToProps = state => ({
  notification: state.notification
})

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification