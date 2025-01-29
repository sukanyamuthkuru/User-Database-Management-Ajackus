import {Component} from 'react'
import ManagementContext from '../../context/ManagementContext'
import DropDownOptions from '../DropDownOptions/DropDownOptions'
import './UserForm.css'

const departmentList = [
  'Technical',
  'Finance',
  'Non-Technical',
  'Development',
  'Human Resources',
  'Backend',
  'Frontend',
  'Cultural',
]

class UserForm extends Component {
  state = {
    firstNameError: false,
    lastnameError: false,
    emailError: false,
  }

  render() {
    const {firstNameError, lastnameError, emailError} = this.state
    return (
      <ManagementContext.Consumer>
        {value => {
          const {
            userList,
            firstName,
            lastName,
            department,
            email,
            onChangeFirstName,
            onChangeLastName,
            onChangeEmail,
            onChangeDepartment,
            addUser,
          } = value

          const onChangeUserFirstName = event => {
            onChangeFirstName(event.target.value)
            if (event.target.value !== '') {
              this.setState({firstNameError: false})
            }
          }

          const onBlurUserFirstName = () => {
            if (firstName === '') {
              this.setState({firstNameError: true})
            } else {
              this.setState({firstNameError: false})
            }
          }

          const onChangeUserLastName = event => {
            onChangeLastName(event.target.value)
            if (event.target.value !== '') {
              this.setState({lastnameError: false})
            }
          }

          const onBlurUserlastname = () => {
            if (lastName === '') {
              this.setState({lastnameError: true})
            } else {
              this.setState({lastnameError: false})
            }
          }

          const onChangeUserEmail = event => {
            onChangeEmail(event.target.value)
            if (event.target.value !== '') {
              this.setState({emailError: false})
            }
          }

          const onBlurUserEmail = () => {
            if (email === '') {
              this.setState({emailError: true})
            } else {
              this.setState({emailError: false})
            }
          }

          const onChangeUserDepartment = event => {
            onChangeDepartment(event.target.value)
          }

          const onSubmitUserForm = event => {
            event.preventDefault()

            if (firstName !== '' && lastName !== '' && email !== '') {
              const id = userList.length + 1
              const newUser = {
                id,
                firstName,
                lastName,
                email,
                department,
              }

              addUser(newUser)
            } else {
              if (firstName === '') {
                this.setState({firstNameError: true})
              }
              if (lastName === '') {
                this.setState({lastnameError: true})
              }
              if (email === '') {
                this.setState({emailError: true})
              }
            }
          }

          return (
            <form className="user-form-container" onSubmit={onSubmitUserForm}>
              <div className="user-form-label-input-container">
                <label htmlFor="firstName" className="userForm-label">
                  FIRST NAME
                </label>
                <input
                  type="text"
                  value={firstName}
                  placeholder="First Name"
                  className="user-form-input"
                  id="firstName"
                  onChange={onChangeUserFirstName}
                  onBlur={onBlurUserFirstName}
                />
                {firstNameError && <p>*Required</p>}
              </div>
              <div className="user-form-label-input-container">
                <label htmlFor="lastName" className="userForm-label">
                  LAST NAME
                </label>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  className="user-form-input"
                  id="lastName"
                  onChange={onChangeUserLastName}
                  onBlur={onBlurUserlastname}
                />
                {lastnameError && <p>*Required</p>}
              </div>
              <div className="user-form-label-input-container">
                <label htmlFor="email" className="userForm-label">
                  EMAIL
                </label>
                <input
                  type="text"
                  value={email}
                  placeholder="Email"
                  className="user-form-input"
                  id="email"
                  onChange={onChangeUserEmail}
                  onBlur={onBlurUserEmail}
                />
                {emailError && <p>*Required</p>}
              </div>
              <div className="user-form-label-input-container">
                <label htmlFor="department" className="userForm-label">
                  DEPARTMENT
                </label>
                <p className="user-form-select-from-dropdown-text">
                  Select From The Dropdown
                </p>
                <select
                  value={department}
                  onChange={onChangeUserDepartment}
                  className="user-form-input"
                >
                  {departmentList.map(each => (
                    <DropDownOptions key={each} item={each} />
                  ))}
                </select>
              </div>
              <button type="submit" className="add-user-button">
                Add User
              </button>
            </form>
          )
        }}
      </ManagementContext.Consumer>
    )
  }
}

export default UserForm
