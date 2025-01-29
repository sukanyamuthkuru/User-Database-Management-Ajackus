import {Component} from 'react'
import ManagementContext from '../../context/ManagementContext'
import UserListItem from '../UserListItem/UserListItem'
import './UserList.css'

class UserList extends Component {
  state = {searchInput: ''}

  render() {
    const {searchInput} = this.state
    return (
      <ManagementContext.Consumer>
        {value => {
          const {editUser, deleteUser} = value
          let {userList} = value
          let emptyList
          if (userList.length === 0) {
            emptyList = true
          } else {
            emptyList = false
          }

          const onClickEditButton = item => {
            editUser(item)
          }

          const onClickDelete = id => {
            deleteUser(id)
          }

          const onChangeSearchInput = event => {
            this.setState({searchInput: event.target.value})
          }

          userList = userList.filter(each =>
            each.firstName.toUpperCase().includes(searchInput.toUpperCase()),
          )

          const renderUserList = () => (
            <ul className="user-list-container">
              <li className="user-list-headings-container">
                <p className="user-list-headings id-width">ID</p>
                <p className="user-list-headings first-name-width">
                  First Name
                </p>
                <p className="user-list-headings last-name-width">Last Name</p>
                <p className="user-list-headings email-width">Email</p>
                <p className="user-list-headings first-name-width">
                  Department
                </p>
              </li>
              {userList.map(each => (
                <UserListItem
                  key={each.id}
                  item={each}
                  onClickEditButton={onClickEditButton}
                  onClickDelete={onClickDelete}
                />
              ))}
            </ul>
          )

          return (
            <div>
              <div className="users-list-heading-search-input-container">
                <h1 className="users-list-head">Users List</h1>
                <input
                  type="search"
                  value={searchInput}
                  onChange={onChangeSearchInput}
                  placeholder="Search By First Name"
                  className="search-input"
                />
              </div>
              {emptyList ? <p>Add User To the List</p> : renderUserList()}
            </div>
          )
        }}
      </ManagementContext.Consumer>
    )
  }
}

export default UserList
