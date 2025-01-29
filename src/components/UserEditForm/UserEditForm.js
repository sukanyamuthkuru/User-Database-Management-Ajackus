import {Component} from 'react'
import ManagementContext from '../../context/ManagementContext'
import DropDownOptions from '../DropDownOptions/DropDownOptions'
import './UserEditForm.css'

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

class UserEditForm extends Component {
  state = {
    firstNameError: false,
    lastnameError: false,
    emailError: false,
    firstNameEdit: '',
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
            edittedId,
            onClickEditUserFormButton,
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
            console.log(event.target.value)
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

          const onSubmitUserEditForm = event => {
            event.preventDefault()
            const {firstNameEdit} = this.state
            this.setState({firstNameEdit: firstName})
            console.log(edittedId)

            if (firstName !== '' && lastName !== '' && email !== '') {
              const editedList = userList.map(each => {
                if (each.id === edittedId) {
                  console.log(edittedId)
                  return {
                    id: edittedId,
                    firstName,
                    lastName,
                    email,
                    department,
                  }
                }
                return each
              })
              console.log(editedList, 'mmmmkmkmk')

              onClickEditUserFormButton(editedList)
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
            <form
              className="user-form-container"
              onSubmit={onSubmitUserEditForm}
            >
              <div className="user-form-label-input-container">
                <label htmlFor="firstNameEdit" className="userForm-label">
                  FIRST NAME
                </label>
                <input
                  type="text"
                  value={firstName}
                  placeholder="First Name"
                  className="user-form-input"
                  id="firstNameEdit"
                  onChange={onChangeUserFirstName}
                  onBlur={onBlurUserFirstName}
                />
                {firstNameError && <p>*Required</p>}
              </div>
              <div className="user-form-label-input-container">
                <label htmlFor="lastNameEdit" className="userForm-label">
                  LAST NAME
                </label>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  className="user-form-input"
                  id="lastNameEdit"
                  onChange={onChangeUserLastName}
                  onBlur={onBlurUserlastname}
                />
                {lastnameError && <p>*Required</p>}
              </div>
              <div className="user-form-label-input-container">
                <label htmlFor="emailEdit" className="userForm-label">
                  EMAIL
                </label>
                <input
                  type="text"
                  value={email}
                  placeholder="Email"
                  className="user-form-input"
                  id="emailEdit"
                  onChange={onChangeUserEmail}
                  onBlur={onBlurUserEmail}
                />
                {emailError && <p>*Required</p>}
              </div>
              <div className="user-form-label-input-container">
                <label htmlFor="departmentEdit" className="userForm-label">
                  DEPARTMENT
                </label>
                <p className="user-form-select-from-dropdown-text">
                  Select From The Dropdown
                </p>
                <select
                  value={department}
                  onChange={onChangeUserDepartment}
                  id="departmentEdit"
                >
                  {departmentList.map(each => (
                    <DropDownOptions key={each} item={each} />
                  ))}
                </select>
              </div>
              <button type="submit" className="add-user-button">
                Edit User
              </button>
            </form>
          )
        }}
      </ManagementContext.Consumer>
    )
  }
}

export default UserEditForm
