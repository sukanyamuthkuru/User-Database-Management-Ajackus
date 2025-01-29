import React from 'react'

const ManagementContext = React.createContext({
  userList: [],
  addUser: () => {},
  deleteUser: () => {},
  editUser: () => {},
  edittedId: '',
  onClickEditUserFormButton: () => {},
  firstName: '',
  lastName: '',
  email: '',
  department: '',
  onChangeFirstName: () => {},
  onChangeLastName: () => {},
  onChangeEmail: () => {},
  onChangeDepartment: () => {},
  isAdd: true,
  isAddFunction: () => {},
})

export default ManagementContext
