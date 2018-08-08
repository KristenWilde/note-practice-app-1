import React from 'react';
import { shallow } from 'enzyme';
import RegisterPassword from '../components/RegisterPassword';

describe('RegisterPassword Component', () => {
  it('Render a password label element', () => {
    const wrapper = shallow(<RegisterPassword />);
    expect(wrapper.contains(<label className='register-text__password-label'
      for='password'>Password</label>)).toBe(true);
  });

  it('Render a password input box', () => {
    const wrapper = shallow(<RegisterPassword />);
    expect(wrapper.contains(<input id='password' name='password'
      type='password' minlength='8' required />)).toBe(true);
  });

  it('Render a meter element to measure password strength', () => {
    const wrapper = shallow(<RegisterPassword />);
    expect(wrapper.contains(<meter max='4' id='password-strength-meter'></meter>)).toBe(true);
  });

  it('Render a placeholder for password strength text', () => {
    const wrapper = shallow(<RegisterPassword />);
    expect(wrapper.contains(<p id='password-strength-text'></p>)).toBe(true);
  });

  it('Render a repeat password label element', () => {
    const wrapper = shallow(<RegisterPassword />);
    expect(wrapper.contains(<label className='register-text__repeat-password-label'
      for='repeat-password'>Repeat Password</label>)).toBe(true);
  });

  it('Render a repeat password input box', () => {
    const wrapper = shallow(<RegisterPassword />);
    expect(wrapper.contains(<input id='repeat-password' name='repeat-password'
      type='password' minlength='8' required />)).toBe(true);
  });
});