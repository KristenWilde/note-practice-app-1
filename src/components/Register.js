import React from 'react';
import RegisterPassword from '../components/RegisterPassword';

function Register(props) {
  return (
    <div>
      <h2 className='register-text__heading'>Register</h2>
      <form className='register__form' method="POST">
        <label className='register-text__firstname-label' for='fname'>First Name</label>
        <input id='fname' name='fname' type='text' minlength='2' maxlength='80' required />
        <label className='register-text__lastname-label' for='lname'>Last Name</label>
        <input id='lname' name='lname' type='text' minlength='2' maxlength='80' required />
        <label className='register-text__username-label' for='username'>Username</label>
        <input id='username' name='username' type='text' minlength='8' maxlength='40' required />
        <RegisterPassword />
      </form>
    </div>
  );
}

export default Register;