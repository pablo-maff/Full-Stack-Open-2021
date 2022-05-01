import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) return null
  else if (notification.type === 'alert') {
    return <div className="error">{notification.message}</div>
  }

  return <div className="success">{notification.message}</div>
}

export default Notification
