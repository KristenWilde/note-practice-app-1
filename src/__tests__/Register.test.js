import React from 'react';
import { shallow } from 'enzyme';
import Register from '../components/Register';

describe('Register Component', () => {
  it('Render the heading', () => {
    const wrapper = shallow(<Register />);
    const text = wrapper.find('.register-text__heading').text();
    expect(text).toBe('Register');
  });

  it('Render the form element', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.find('.register__form')).toHaveLength(1);
  });

  it('Render a first name label element', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<label className='register-text__firstname-label' for='fname'>First Name</label>)).toBe(true);
  });

  it('Render a first name input text box', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<input id='fname' name='fname' 
      type='text' minlength='2' maxlength='80' required />)).toBe(true);
  });

  it('Render a last name label element', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<label className='register-text__lastname-label' for='lname'>Last Name</label>)).toBe(true);
  });

  it('Render a last name input text box', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<input id='lname' name='lname' 
      type='text' minlength='2' maxlength='80' required />)).toBe(true);
  });

  it('Render a username label element', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<label className='register-text__username-label'
      for='username'>Username</label>)).toBe(true);
  });

  it('Render a username input text box', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.contains(<input id='username' name='username'
      type='text' minlength='8' maxlength='40' required />)).toBe(true);
  });
});