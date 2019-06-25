import React from "react";
import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import SettingsNat from './../components/SettingsNat'

const Settings = ({ appStore }) => {
  const nationalities = ['CH', 'ES', 'FR', 'GB'];

  /**
   * @desc take value from checkbox change event and pass it to toggle function
   * @param {Object} e
   */
  const handleNatChange = (e) => {
    const nat = e.target.value;
    appStore.toggleNat(nat);
  }

  return (
    <main className="route route--settings">
      <header className="header">
        <Link
          to='/'
          className="header__link"
        >
          <img
            alt="settings"
            className="header__link-img"
            src={require('./../assets/img/icon-home.png')}
          />
        </Link>

        <h1 className="header__title">Address Book</h1>
        <i></i>
      </header>

      <div className="settings-nat-wrap">
        {nationalities.map(n =>
          <SettingsNat
            nat={n}
            key={n}
            isChecked={appStore.nat.includes(n)}
            handleNatChange={handleNatChange}
          />)}
      </div>
    </main>
  )
}

export default observer(Settings)
