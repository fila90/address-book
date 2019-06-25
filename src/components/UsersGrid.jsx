import React from "react";
import UserCard from './UserCard'

const UsersGrid = ({ users, handleScroll, handleUserClick }) => (
  <div className="users-grid-wrap" onScroll={handleScroll}>
    <div className="users-grid">
      {users.map((u, i) => <UserCard user={u} handleUserClick={handleUserClick} key={i} />)}
    </div>
    {users.length === 1000 && <h2 className="text-center">End of users catalog.</h2>}
  </div>
)

export default UsersGrid
