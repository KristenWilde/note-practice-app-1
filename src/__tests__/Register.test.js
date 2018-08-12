import React from 'react';
import { shallow } from 'enzyme';
import Register from '../components/Register';

describe('Register Component', () => {
  it('Render the heading', () => {
    const wrapper = shallow(<Register />);
    const text = wrapper.find('.register__heading--text').text();
    expect(text).toBe('Register');
  });

  it('Render the form element', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.find('.register-form')).toHaveLength(1);
  });

  it('Render a first name label element', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<label className='register-form__firstname--label' for='fname'>First Name</label>)).toBe(true);
  });

  it('Render a first name input text box', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<input id='fname' name='fname' 
      type='text' minlength='2' maxlength='80' required />)).toBe(true);
  });

  it('Render a last name label element', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<label className='register-form__lastname--label' for='lname'>Last Name</label>)).toBe(true);
  });

  it('Render a last name input text box', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<input id='lname' name='lname' 
      type='text' minlength='2' maxlength='80' required />)).toBe(true);
  });

  it('Render a username label element', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<label className='register-form__username--label'
      for='username'>Username</label>)).toBe(true);
  });

  it('Render a username input text box', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<input id='username' name='username'
      type='text' minlength='8' maxlength='40' required />)).toBe(true);
  });

  it('Render a password label element', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<label className='register-form__password--label'
      for='password'>Password</label>)).toBe(true);
  });

  it('Render a password input box', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<input id='password' name='password'
      type='password' minlength='8' required />)).toBe(true);
  });

  it('Render a meter element to measure password strength', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<meter max='4' id='password-strength__meter'></meter>)).toBe(true);
  });

  it('Render a placeholder for password strength text', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<p id='password-strength__text'></p>)).toBe(true);
  });

  it('Render a repeat password label element', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<label className='register-form__repeat-password--label'
      for='repeat-password'>Repeat Password</label>)).toBe(true);
  });

  it('Render a repeat password input box', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<input id='repeat-password' name='repeat-password'
      type='password' minlength='8' required />)).toBe(true);
  });
  
  it('Render a meter element', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<meter max='4' 
      id='password-strength__meter'></meter>)).toBe(true);
  });

  it('Render a paragraph element for meter text', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<p id='password-strength__text'></p>)).toBe(true);
  });
});