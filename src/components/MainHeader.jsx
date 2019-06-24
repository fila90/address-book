import React from "react"
import { Link } from "react-router-dom"

const MainHeader = ({ handleSearch }) => {
  return (
    <header className="header">
      <Link
        to='/settings'
        className="header__link">
        <img
          alt="settings"
          className="header__link-img"
          src={require('./../assets/img/icon-settings.png')}
        />
      </Link>

      <h1 className="header__title">Address Book</h1>

      <label className="search-bar">
        <input
          className="search-bar__input"
          onInput={handleSearch}
          placeholder="Search for user"
          type="text"
        />
        <img
          className="search-bar__img"
          alt="search"
          src={require('./../assets/img/icon-search.png')}
        />
      </label>
    </header>
  )
}

export default MainHeader
