import React from 'react';

function RegisterPassword(props) {
  return (
    <div>
      <label className='register-text__password-label' for='password'>Password</label>
      <input id='password' name='password' type='password' minlength='8' required />
      <meter max='4' id='password-strength-meter'></meter>
      <p id='password-strength-text'></p>
      <label className='register-text__repeat-password-label' for='repeat-password'>Repeat Password</label>
      <input id='repeat-password' name='repeat-password' type='password' minlength='8' required />
    </div>
  );
}

export default RegisterPassword;

