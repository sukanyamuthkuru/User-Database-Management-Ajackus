import React from 'react'

const ManagementContext = React.createContext({
  userList: [],
  addUser: () => {},
  deleteUser: () => {},
  editUser: () => {},
  firstName: '',
  lastName: '',
  email: '',
  department: '',
  onChangeFirstName: () => {},
  onChangeLastName: () => {},
  onChangeEmail: () => {},
  onChangeDepartment: () => {},
})

export default ManagementContext
