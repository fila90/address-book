import React from "react";
import UserCard from './UserCard'

const UsersGrid = ({ users, handleScroll, handleUserClick }) => (
  <div className="users-grid" onScroll={handleScroll}>
    {users.map((u, i) => <UserCard user={u} handleUserClick={handleUserClick} key={i} />)}
  </div>
)

export default UsersGrid
