import './UserListItem.css'

const UserListItem = props => {
  const {item, onClickEditButton, onClickDelete} = props

  const onClickEdit = () => {
    onClickEditButton(item)
  }

  const onClickDeleteUser = () => {
    onClickDelete(item.id)
  }

  return (
    <li className="user-list-item-container">
      <p className="user-list-text id-width">{item.id}</p>
      <p className="user-list-text first-name-width">{item.firstName}</p>
      <p className="user-list-text last-name-width">{item.lastName}</p>
      <p className="user-list-text email-width">{item.email}</p>
      <p className="user-list-text first-name-width">{item.department}</p>
      <button type="button" className="edit-button" onClick={onClickEdit}>
        Edit
      </button>
      <button
        type="button"
        className="edit-button delete-button"
        onClick={onClickDeleteUser}
      >
        Delete
      </button>
    </li>
  )
}

export default UserListItem
