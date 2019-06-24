import React from "react";

const UserCard = ({ user, handleUserClick }) => (
  <div
    className="user-card"
    onClick={handleUserClick.bind(null, user)}
  >
    <img
      alt={`${user.name.first} ${user.name.last}`}
      className="user-card__img"
      src={user.picture.medium}
    />
    <div className="user-card__info">
      <h4 className="user-card__name">{user.name.first}</h4>
      <h4 className="user-card__name">{user.name.last}</h4>
      <h4 className="user-card__name user-card__name--username">{user.name.username}</h4>
      <h5 className="user-card__email">{user.email}</h5>
    </div>
  </div>
)

export default UserCard
