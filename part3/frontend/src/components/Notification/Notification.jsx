const Notification = ({ message, notificationType }) => {
  if (message === '') {
    return null
  }

  return (
      <div className={notificationType}>
        {message}
      </div>
  )
}

export default Notification;