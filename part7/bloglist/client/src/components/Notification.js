import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) return null
  else if (notification.type === 'alert') {
    return (
      <Alert severity="error" sx={{ mt: 10 }}>
        {notification.message}
      </Alert>
    )
  }

  return (
    <Alert severity="success" sx={{ mt: 2 }}>
      {notification.message}
    </Alert>
  )
}

export default Notification
