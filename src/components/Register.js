import React, { Component } from 'react';
import range from 'lodash.range';
import Field from './Field';
import isEmail from 'validator/lib/isEmail';
import token, { sampleUserId } from '../token';

export default class Register extends Component {
  state = {
    fields: {
      firstname: '',
      lastname: '',
      dob: {
        month: '',
        day: '',
        year: '',
      },
      password: '',
      email: ''
    },
    fieldErrors: {},
    isEmailAsUsername: false,
    isMinor: false
  }

  getDateOfBirth = (dob) => {
    return [this.state.dob.month, this.state.dob.day, this.state.dob.year].join('-');
  }

  validate () {
    const newUser = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);
    // TODO: Add more error cases
    if (!newUser.firstname) return true;
    if (!newUser.lastname) return true;
    if (!newUser.email) return true;
    if (errMessages.length) return true;
    
    return false;
  }

  _handleInputChange = ({name, value, error}) => {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({ fields, fieldErrors });
  }

  _handleFormSubmit = (evt) => {
    const newUser = {
      ...this.state.fields
    };
    evt.preventDefault();

    if (this.validate()) return;
    // fetchCall here
    this.setState({
      newUser,
      fields: {
        firstname: '',
        lastname: '',
        dob: {
          month: '',
          day: '',
          year: '',
        },
        password: '',
        email: ''
      }
    });
  }
    /*fetch('http://localhost:3000/register', {
      method: 'POST',
      body: JSON.stringify(this.state.fields),
      headers: {
        'Content-Type': 'application/json',
        token
      }
    }).then(res => res.json())
    .then(res => console.log('Success:', JSON.stringify(res)))
    .catch(err => console.error('Error:', err));*/


  render() {
    const months = ['01-January', '02-Feburary', '03-March', '04-April',
      '05-May','06-June', '07-July', '08-August',
      '09-September', '10-October','11-November', '12-December'].map((m) => {
        return <option value={m.slice(0,2)}>{m}</option>
    });
    const days = range(1, 32).map((d) => {
      return <option value={d < 10 ? `0${d}` : d.toString()}>{d}</option>
    });
    const currentDate = new Date(Date.now());
    const years = range(currentDate.getFullYear() - 100,
     currentDate.getFullYear() + 1).map((y) => {
      return <option value={y.toString()}>{y}</option>
    });

    return (
      <div>
        <h2 className='register__heading--text'>Register</h2>
        <form onSubmit={this._handleFormSubmit} action='/register' className='register-form' method="POST">
          <label className='register-form__firstname--label' htmlFor='fname'>First Name</label>
          <Field
            id='fname'
            name='firstname'
            minLength='2'
            maxLength='80'
            onChange={this._handleInputChange}
            validate={(val) => (val ? false : 'First Name Required')}
          />
          <label className='register-form__lastname--label' htmlFor='lname'>Last Name</label>
          <Field
            id='lname'
            name='lastname'
            minLength='2'
            maxLength='80'
            onChange={this._handleInputChange}
            validate={(val) => (val ? false : 'Last Name Required')}
          />
          <label className='register-form__dob--label' htmlFor='dob'>Date of Birth</label>
          <label className='register-form__dob--month--label' htmlFor='register--form__dob--month'>Month</label>
          <select
            id='register--form__dob--month'
            name='dobMonth'
            onChange={this._handleInputChange}
          >
            { months }
          </select>
          <label className='register-form__dob--day--label'>Day:</label>
          <select id='register--form__dob--day' name='dobDay'>
            { days }
          </select>
          <label className='register-form__dob--year--label' name='dobYear'>Year:</label>
          <select id='register--form__dob--year'>
            { years }
          </select>
          <label className='register-form__email--label' htmlFor='email'>Email</label>
          <Field
            type='email'
            id='email'
            name='email'
            onChange={this._handleInputChange}
            validate={(val) => (isEmail(val) ? false : 'Invalid Email')}
          />
          <label className='register-form__repeat-email--label' htmlFor='confirm-email'>Repeat Email</label>
          <Field
            type='email'
            id='confirm-email'
            onChange={this._handleInputChange}
            validate={(val) => ((val === this.state.fields.email) ? false : 'Email addresses do not match')}
          />
          <input
            type='checkbox'
            id='emailAsUsername'
            name='email-as-user'
            checked={ this.state.isEmailAsUsername }
          />
          <label className='register-form__email-as-user--checkbox' htmlFor='emailAsUsername'>Use email as username?</label>
          <label className='register-form__username--label' htmlFor='username'>Username</label>
          <input
            id='username'
            name='username'
            type='text'
            minLength='8'
            maxLength='40'
            required={true}
          />
          <label className='register-form__password--label' htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            minLength='8'
            required={true}
          />
          <meter max='4' id='password-strength__meter'></meter>
          <p id='password-strength__text'></p>
          <label className='register-form__repeat-password--label' htmlFor='repeat-password'>Repeat Password</label>
          <input
            id='repeat-password'
            name='repeat-password'
            type='password'
            minLength='8'
            required={true}
          />
          <input
            type='submit'
            name='submit'
            value='Submit'
            disabled={this.validate()}
          />
        </form>
      </div>
    );
  }
}
