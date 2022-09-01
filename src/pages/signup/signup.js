import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './styles.css';
import '../../index.css';
// import { baseDevelopmentURL } from '../../utils/constants';
import { Header } from '../../components/Header';

const SignUp = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      occupation: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, 'Mininum 2 characters')
        .max(30, 'Maximum 30 characters')
        .required('Your first name is required'),
      lastName: Yup.string()
        .min(2, 'Mininum 2 characters')
        .max(30, 'Maximum 30 characters')
        .required('Your last name is required'),
      email: Yup.string().email('Invalid email format').required('Your email is required'),

      password: Yup.string().min(8, 'Minimum 8 characters').required('You must enter a password'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Password does not match')
        .required('You must enter a password'),
      occupation: Yup.string(),
    }),
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      try {
        const data = await axios.post(`${baseDevelopmentURL}/register`, {
          data: {
            userDetails: { firstName: values.firstName, lastName: values.lastName },
            authInfo: { email: values.email, password: values.password },
          },
        });

        setLoggedIn(true);
        setUser(data.data.data.user);
        navigate('/gallery', { state: { user: data.data.data.user } });
      } catch (err) {
        setErrorMessage(err.message);
        setError(true);
      }
    },
  });
  return (
    <div>
      <Header isLoggedIn={loggedIn} />
      <h2 class="text-center mt-5 p-1">Sign up to use Hyperlink today!</h2>
      <div className="d-flex justify-content-center details-container">
        <div class="d-flex justify-content-center align-items-center m-5">
          <div>
            <form className="w-300" onSubmit={formik.handleSubmit}>
              <div class="row mb-3">
                <label class="col-sm-2 col-form-label">First Name</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    class="form-control form-style"
                    placeholder="First Name"
                  />
                  {formik.errors.firstName && formik.touched.firstName && (
                    <p className="input-error">{formik.errors.firstName}</p>
                  )}
                </div>
              </div>
              <div class="d-flex flex-row justify-content-between mb-3">
                <label class="col-sm-2 col-form-label">Last Name</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    class="form-control form-style"
                    placeholder="Last Name"
                  />
                  {formik.errors.lastName && formik.touched.lastName && (
                    <p className="input-error">{formik.errors.lastName}</p>
                  )}
                </div>
              </div>
              <div class="d-flex flex-row justify-content-between mb-3">
                <label class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    class="form-control form-style"
                    placeholder="Email"
                  />
                  {formik.errors.lastName && formik.touched.email && (
                    <p className="input-error">{formik.errors.email}</p>
                  )}
                </div>
              </div>
              <div class="d-flex flex-row justify-content-between mb-3">
                <label class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                  <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    class="form-control form-style"
                    placeholder="Password"
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="input-error">{formik.errors.password}</p>
                  )}
                </div>
              </div>
              <div class="d-flex flex-row justify-content-between mb-3">
                <label class="col-sm-2 col-form-label">Confirm Password</label>
                <div class="col-sm-10">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    class="form-control form-style"
                    placeholder="Confirm Password"
                  />
                  {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                    <p className="input-error">{formik.errors.confirmPassword}</p>
                  )}
                </div>
              </div>
              <div class="d-flex flex-row justify-content-between mb-3">
                <label class="col-sm-2 col-form-label">Occupation</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="occupation"
                    value={formik.values.occupation}
                    onChange={formik.handleChange}
                    class="form-control form-style"
                    placeholder="Occupation"
                  />
                </div>
                {error && <p className="input-error">{errorMessage}</p>}
              </div>

              <div class="d-flex flex-row justify-content-center">
                <button type="submit" class="btn auth-button" id="signup">
                  Sign Up
                </button>
              </div>
              <div className="lh-copy mt3">
                <Link to={'/login'} id="login" className="details-footer">
                  Already have an account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
