import {Component} from 'react'

import './index.css'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'

const initialContainerBackgroundClassnames = [
  'blue',
  'amber',
  'green',
  'light-green',
  'orange',
  'pink',
]

class PasswordManager extends Component {
  state = {
    inputWebsite: '',
    inputUsername: '',
    inputPassword: '',
    passwordList: [],
    showPasswords: false,
    inputSearch: '',
  }

  onChangeWebSiteInput = event => {
    this.setState({inputWebsite: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({inputUsername: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({inputPassword: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const initialBgColorClassName = `initial-container ${
      initialContainerBackgroundClassnames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassnames.length - 1,
        )
      ]
    }`

    const {inputWebsite, inputUsername, inputPassword} = this.state
    if (inputWebsite !== '' && inputUsername !== '' && inputPassword !== '') {
      const passwordDetails = {
        id: uuidv4(),
        website: inputWebsite,
        username: inputUsername,
        password: inputPassword,
        initialClassName: initialBgColorClassName,
      }

      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, passwordDetails],
        inputWebsite: '',
        inputUsername: '',
        inputPassword: '',
      }))
    }
  }

  onPasswordShowStatus = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  onDeletePassword = id => {
    const {passwordList} = this.state
    const updatePasswordsAfterDelete = passwordList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordList: updatePasswordsAfterDelete})
  }

  onSearchInput = event => {
    this.setState({inputSearch: event.target.value})
  }

  getFilterPasswordList = () => {
    const {passwordList, inputSearch} = this.state
    const filterPasswordList = passwordList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(inputSearch.toLowerCase()),
    )
    return filterPasswordList
  }

  render() {
    const updatedPasswordList = this.getFilterPasswordList()
    const passwordsCount = updatedPasswordList.length
    const {
      inputWebsite,
      inputUsername,
      inputPassword,
      showPasswords,
      inputSearch,
    } = this.state
    return (
      <div className="password-manager-bg-container">
        <div className="password-manager-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="input-container">
            <form
              className="input-elements-container"
              onSubmit={this.onAddPassword}
            >
              <h1 className="heading">Add New Password</h1>
              <div className="input-website-container">
                <div className="input-logo">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="website-logo"
                  />
                </div>
                <div className="input-element">
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter Website"
                    value={inputWebsite}
                    onChange={this.onChangeWebSiteInput}
                  />
                </div>
              </div>
              <div className="input-website-container">
                <div className="input-logo">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="website-logo"
                  />
                </div>
                <div className="input-element">
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter Username"
                    value={inputUsername}
                    onChange={this.onChangeUsernameInput}
                  />
                </div>
              </div>
              <div className="input-website-container">
                <div className="input-logo">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="website-logo"
                  />
                </div>
                <div className="input-element">
                  <input
                    type="password"
                    className="input"
                    placeholder="Enter Password"
                    value={inputPassword}
                    onChange={this.onChangePasswordInput}
                  />
                </div>
              </div>
              <div className="button-container">
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-image"
            />
          </div>
          <div className="password-show-container">
            <div className="password-count-search-container">
              <div className="counter-container">
                <h1 className="password-count-heading">Your Passwords</h1>
                <div className="counter">
                  <p className="span">{passwordsCount}</p>
                </div>
              </div>
              <div className="input-website-container">
                <div className="input-search-logo">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-logo"
                  />
                </div>
                <div className="input-element1">
                  <input
                    type="search"
                    className="input-search"
                    placeholder="Search"
                    value={inputSearch}
                    onChange={this.onSearchInput}
                  />
                </div>
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="checkBox"
                className="check"
                onChange={this.onPasswordShowStatus}
              />
              <label htmlFor="checkBox" className="label">
                Show Passwords
              </label>
            </div>
            {updatedPasswordList.length === 0 ? (
              <div className="no-password-img-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password-img"
                />
                <p className="no-password">No Passwords</p>
              </div>
            ) : (
              <ul className="password-list">
                {updatedPasswordList.map(eachPassword => (
                  <PasswordItem
                    key={eachPassword.id}
                    passwordDetail={eachPassword}
                    showStatus={showPasswords}
                    onDeletePassword={this.onDeletePassword}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
