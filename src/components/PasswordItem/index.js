import './index.css'

const PasswordItem = props => {
  const {passwordDetail, showStatus, onDeletePassword} = props
  const {id, website, username, password, initialClassName} = passwordDetail
  const initial = website.split('').slice(0, 1)

  const deletePassword = () => {
    onDeletePassword(id)
  }

  return (
    <li className="list-of-passwords">
      <div className={initialClassName}>
        <p className="initial">{initial[0].toUpperCase()}</p>
      </div>
      <div className="username-password-container">
        <p className="website">{website}</p>
        <p className="username">{username}</p>
        {showStatus ? (
          <p className="password">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-img"
          />
        )}
      </div>
      <button type="button" className="delete-button" onClick={deletePassword}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
