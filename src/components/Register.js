import React, { Component } from 'react';
import range from 'lodash.range';
import { Formik, Field } from 'formik';
import validate from '../validate';
import getValidationSchema from '../getValidationSchema';
import token, { sampleUserId } from '../token';

const initialValues = {
  firstname: '',
  lastname: '',
  dobMonth: '',
  dobDay: '',
  dobYear: '',
  password: '',
  confirmPassword: '',
  email: '',
  confirmEmail: '',
  username: '',
  isEmailAsUsername: false,
};

function getDateOfBirth(user) {
  return [
    user.dobMonth, 
    user.dobDay, 
    user.dobYear].join('/');
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
/**/

const months = ['01-January', '02-Feburary', '03-March', '04-April',
  '05-May','06-June', '07-July', '08-August',
  '09-September', '10-October','11-November', '12-December'].map((m) => {
    return <option key={m} value={m.slice(0,2)}>{m}</option>
});

const days = range(1, 32).map((d) => {
  return <option key={`day${d}`} value={d < 10 ? `0${d}` : d.toString()}>{d}</option>
});

const years = range(new Date(Date.now()).getFullYear() - 100,
  new Date(Date.now()).getFullYear() + 1).map((y) => {
  return <option key={`year${y}`}value={y.toString()}>{y}</option>
});

export default function RegisterFormContainer() {
  return (
      <Formik
        initialValues={initialValues}
        onSubmit={((values) => console.log(values))}
        render={RegisterForm}
        validate={validate(getValidationSchema)}
      />
  );
}
function RegisterForm(props) {
  const { isSubmitting, errors, handleChange, handleSubmit } = props;

  return (
    <div>
    <h2 className='register__heading--text'>Register</h2>
    <form action='/register' onSubmit={handleSubmit} className='register-form' method="POST">
    <label className='register-form__firstname--label' htmlFor='fname'>First Name</label>
    <Field
      id='fname'
      name='firstname'
    />
    <div className="form-field-error">{errors.firstname}</div>
    <label className='register-form__lastname--label' htmlFor='lname'>Last Name</label>
    <Field
      id='lname'
      name='lastname'
    />
    <label className='register-form__dob--label' htmlFor='dob'>Date of Birth</label>
    <label className='register-form__dob--month--label' htmlFor='register--form__dob--month'>Month</label>
    <Field component='select'
      id='register--form__dob--month'
      name='dobMonth'
    >
      { months }
    </Field>
    <label className='register-form__dob--day--label' htmlFor='register--form__dob--day'>Day:</label>
    <Field component='select' id='register--form__dob--day' name='dobDay'>
      { days }
    </Field>
    <label className='register-form__dob--year--label' htmlFor='register--form__dob--year'>Year:</label>
    <Field component='select' id='register--form__dob--year' name='dobYear'>
      { years }
    </Field>
    <label className='register-form__email--label' htmlFor='email'>Email</label>
    <Field
      type='email'
      id='email'
      name='email'
    />
    <label className='register-form__repeat-email--label' htmlFor='confirm-email'>Repeat Email</label>
    <Field
      type='email'
      id='confirm-email'
      name='confirmEmail'
    />
    <Field type='checkbox'
      id='emailAsUsername'
      name='isEmailAsUsername'
    />
    <label className='register-form__email-as-user--checkbox' htmlFor='emailAsUsername'>Use email as username?</label>
    <label className='register-form__username--label' htmlFor='username'>Username</label>
    <Field
      id='username'
      name='username'
    />
    <label className='register-form__password--label' htmlFor='password'>Password</label>
    <Field
      id='password'
      name='password'
      type='password'
    />
    <meter max='4' id='password-strength__meter'></meter>
    <p id='password-strength__text'></p>
    <label className='register-form__repeat-password--label' htmlFor='repeat-password'>Repeat Password</label>
    <Field
      id='confirm-password'
      name='confirmPassword'
      type='password'
      minLength='8'
    />
    <button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Loading' : 'Register'}</button>
    </form>
    </div>
  );
}

function handleSubmit(values, {setSubmitting, setErrors}) {
  setTimeout(() => {
    console.log('User has been successfully saved!', values);
    setSubmitting(false);
  }, 2000);
}