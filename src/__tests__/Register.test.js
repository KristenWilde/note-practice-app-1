/**
 * @jest-environment jsdom
*/
import React from 'react';
import { shallow, mount } from 'enzyme';
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

  it('Render a label element for dob', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<label className='register-form__dob--label' for='dob'>Date of Birth</label>)).toBe(true);
  });

  it('Render a date element for dob', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<input type='date' id='dob' name='dob' required />)).toBe(true);
  });

  it('Render a email label element', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<label className='register-form__email--label' for='email'>Email</label>)).toBe(true);
  });

  it('Render a email input element', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<input type='email' id='email' name='email' required />)).toBe(true);
  });

  it('Render a repeat email label element', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<label className='register-form__repeat-email--label' for='repeat-email'>Repeat Email</label>)).toBe(true);
  });

  it('Render a repeat email input element', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<input type='email' id='repeat-email' name='repeat-email' required />)).toBe(true);
  });

  it('Render a disabled submit button', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<input type='submit' name='submit' value='Submit' disabled />)).toBe(true);
  });

  it('Render a checkbox input for email as username', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<input type='checkbox' id='emailAsUsername' name='email-as-user' value='yes' />)).toBe(true);
  });

  it('Render a checkbox label for email as username', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<label className='register-form__email-as-user--checkbox'
     htmlFor='emailAsUsername'>Use email as username?</label>)).toBe(true);
  });

  it('Button should be enabled once all form elements are filled out', () => {
    const wrapper = mount(<Register />);
    const mockedEvent = { "target": { "value": 'Miguel'} };
    wrapper.find('input#fname').simulate('change', mockedEvent);
    expect(wrapper.find('input#fname').value).toBe('Miguel');
  });
});