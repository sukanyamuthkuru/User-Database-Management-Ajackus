import {Component} from 'react'

import ManagementContext from './context/ManagementContext'
import UserForm from './components/UserForm/UserForm'
import UserList from './components/UserList/UserList'
import UserEditForm from './components/UserEditForm/UserEditForm'

import './App.css'

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

class App extends Component {
  state = {
    userList: [],
    firstName: '',
    lastName: '',
    email: '',
    department: departmentList[0],
    isAdd: true,
    edittedId: '',
  }

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()

      const updatedData = data.map(each => {
        const firstName = each.name.slice(0, each.name.indexOf(' '))
        const lastName = each.name.slice(each.name.indexOf(' ') + 1)

        return {
          id: data.indexOf(each) + 1,
          firstName,
          lastName,
          email: each.email,
          department:
            departmentList[Math.floor(Math.random() * departmentList.length)],
        }
      })
      this.setState({userList: updatedData})
    } catch (err) {
      console.log(err)
    }
  }

  onChangeFirstName = name => {
    this.setState({firstName: name})
  }

  onChangeLastName = name => {
    this.setState({lastName: name})
  }

  onChangeEmail = email => {
    console.log(email, 'edit')
    this.setState({email})
  }

  onChangeDepartment = department => {
    this.setState({department})
  }

  addUser = newUser => {
    this.setState(preState => ({
      userList: [...preState.userList, newUser],
      firstName: '',
      lastName: '',
      email: '',
      department: departmentList[0],
    }))
  }

  editUser = item => {
    this.setState({
      isAdd: false,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      department: item.department,
      edittedId: item.id,
    })
  }

  onClickEditUserFormButton = editedUserList => {
    this.setState({
      isAdd: true,
      userList: editedUserList,
      firstName: '',
      lastName: '',
      email: '',
      department: departmentList[0],
    })
  }

  deleteUser = id => {
    const {userList} = this.state
    const newList = userList.filter(each => each.id !== id)

    this.setState({userList: newList})
  }

  render() {
    const {
      userList,
      firstName,
      lastName,
      email,
      department,
      isAdd,
      edittedId,
    } = this.state
    return (
      <ManagementContext.Provider
        value={{
          userList,
          onChangeFirstName: this.onChangeFirstName,
          firstName,
          onChangeLastName: this.onChangeLastName,
          lastName,
          onChangeEmail: this.onChangeEmail,
          email,
          onChangeDepartment: this.onChangeDepartment,
          department,
          addUser: this.addUser,
          editUser: this.editUser,
          isAdd,
          isAddFunction: this.editUser,
          onClickEditUserFormButton: this.onClickEditUserFormButton,
          edittedId,
          deleteUser: this.deleteUser,
        }}
      >
        <div className="app-container">
          <h1 className="user-database-heading">User Database Management</h1>
          <div className="user-form-and-user-list-container">
            {isAdd ? <UserForm /> : <UserEditForm />}
            <UserList />
          </div>
        </div>
      </ManagementContext.Provider>
    )
  }
}

export default App
