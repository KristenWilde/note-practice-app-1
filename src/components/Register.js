import React, { Component } from 'react';

export default class Register extends Component {
  _handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <h2 className='register__heading--text'>Register</h2>
        <form className='register-form' method="POST">
          <label className='register-form__firstname--label' for='fname'>First Name</label>
          <input id='fname' name='fname' type='text' minlength='2' maxlength='80' required />
          <label className='register-form__lastname--label' for='lname'>Last Name</label>
          <input id='lname' name='lname' type='text' minlength='2' maxlength='80' required />
          <label className='register-form__dob--label' for='dob'>Date of Birth</label> 
          <input type='date' id='dob' name='dob' />
          <label className='register-form__email--label' for='email'>Email</label>
          <input type='email' id='email' name='email' />
          <label className='register-form__repeat-email--label' for='repeat-email'>Repeat Email</label>
          <input type='email' id='repeat-email' name='repeat-email' />
          <label className='register-form__username--label' for='username'>Username</label>
          <input id='username' name='username' type='text' minlength='8' maxlength='40' required />
          <label className='register-form__password--label' for='password'>Password</label>
          <input id='password' name='password' type='password' minlength='8' required />
          <meter max='4' id='password-strength__meter'></meter>
          <p id='password-strength__text'></p>
          <label className='register-form__repeat-password--label' for='repeat-password'>Repeat Password</label>
          <input id='repeat-password' name='repeat-password' type='password' minlength='8' required />
          <input type='submit' name='submit' value='Submit' disabled />
        </form>
      </div>
    );
  }
}