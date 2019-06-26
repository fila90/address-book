import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from "enzyme";
import Settings from "./Settings";
import SettingsNat from "./../components/SettingsNat"
import appStore from "./../store";

describe('<Settings />', () => {
  it('renders withouth crashing', () => {
    shallow(<Settings appStore={appStore} />)
  })

  it('renders 4 SettingsNat', () => {
    const settings = mount(
      <Router>
        <Settings appStore={appStore} />
      </Router>
    );

    expect(settings.find(SettingsNat).length).toBe(4);
  })

  it('changes localStorage', () => {
    const settings = mount(
      <Router>
        <Settings appStore={appStore} />
      </Router>
    );

    settings.find(SettingsNat).first().find('input').simulate('change')
    expect(settings.find(SettingsNat).first().find('input').prop('checked')).toEqual(false);
    expect(JSON.parse(window.localStorage.getItem('nat'))).toEqual(['ES', 'FR', 'GB']);
  })
})
