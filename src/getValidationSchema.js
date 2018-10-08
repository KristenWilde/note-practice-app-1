import * as Yup from 'yup';

export default function getValidationSchema(values) {
  return Yup.object().shape({
    firstname: Yup.string()
      .min(2, 'Too short!')
      .max(80, 'Too long!')
      .required('Required'),
    lastname: Yup.string()
      .min(2, 'Too short!')
      .max(80, 'Too long!')
      .required('Required'),
    dobMonth: Yup.string()
      .required('Month must be selected'),
    dobDay: Yup.string()
      .required('Day must be selected'),
    dobYear: Yup.string()
      .required('Year value must be selected'),
    email: Yup.string()
      .email('Invalid email!')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password must be greater than 8 characters')
      .required('Password required!'),
    username: Yup.string()
      .min(8, 'Too short')
      .max(40, 'Too long')
      .required('Username required'),
    confirmPassword: Yup.string()
      .oneOf([values.password], 'Passwords are not the same')
      .required('Password confirmation is required'),
    confirmEmail: Yup.string()
      .oneOf([values.email], 'Emails are not the same')
      .required('Email confirmation is required'),
  });
}