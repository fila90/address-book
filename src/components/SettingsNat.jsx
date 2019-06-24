import React from "react";

const SettingsNat = ({ nat, isChecked, handleNatChange }) => (
  <label className="settings-nat">
    <input
      type="checkbox"
      name="nat"
      value={nat}
      checked={isChecked}
      className="settings-nat__input"
      onChange={handleNatChange}
    />
    <img
      src={require(`./../assets/img/flag-${nat}.png`)}
      alt={nat}
      className="settings-nat__img"
    />
  </label>
)

export default SettingsNat;
