import React from "react";

const UserDetails = ({ user, handleCloseDetails }) => (
  <div className="user-details">
    <div className="user-info">
      <p className="user-info__copy">
        <b>Street: </b>
        {user.location.street}
      </p>
      <p className="user-info__copy">
        <b>City: </b>
        {user.location.city}
      </p>
      <p className="user-info__copy">
        <b>State: </b>
        {user.location.state}
      </p>
      <p className="user-info__copy">
        <b>Postcode: </b>
        {user.location.postcode}
      </p>
      <p className="user-info__copy">
        <b>Phone: </b>
        {user.phone}
      </p>
      <p className="user-info__copy">
        <b>Cell: </b>
        {user.cell}
      </p>

      <button
        className="user-info__close"
        onClick={handleCloseDetails}
      >
        <img
          src={require('./../assets/img/icon-close.png')}
          alt="close"
          className="user-info__close-img"
        />
      </button>
    </div>
  </div>
)

export default UserDetails
