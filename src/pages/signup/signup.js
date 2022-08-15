import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
// import 'date-input-polyfill';

import './styles.css';
import '../../index.css';

const SignUp = (props) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      dob: '',
      password: '',
      confirmPassword: '',
      occupation: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Mininum 2 characters')
        .max(30, 'Maximum 30 characters')
        .required('Your name is required'),
      email: Yup.string().email('Invalid email format').required('Your email is required'),
      dob: Yup.date()
        .test('age', 'You must be 16 or older', function (dob) {
          const cutoff = new Date();
          cutoff.setFullYear(cutoff.getFullYear() - 16);
          return dob <= cutoff;
        })
        .required('You must enter a date of birth'),
      password: Yup.string().min(8, 'Minimum 8 characters').required('You must enter a password'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Password does not match')
        .required('You must enter a password'),
      occupation: Yup.string(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      navigate('/gallery');
    },
  });

  return (
    <div className="details-container">
      <main className="details-main">
        <div className="measure">
          <h1 className="details-title">Sign Up</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt3">
              <label className="black">Name</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="input-box-container input-reset"
                placeholder="Name"
              />
              {formik.errors.name && formik.touched.name && (
                <p className="input-error">{formik.errors.name}</p>
              )}
            </div>

            <div className="mt3">
              <label className="black">Email</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="input-box-container input-reset"
                placeholder="Email"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="input-error">{formik.errors.email}</p>
              )}
            </div>
            <div className="mt3">
              <label className="black">Date of Birth</label>
              <input
                placeholder="Date of Birth"
                type="date"
                name="dob"
                value={formik.values.dob}
                onChange={formik.handleChange}
                className="input-box-container input-reset"
              />
              {formik.errors.dob && formik.touched.dob && (
                <p className="input-error">{formik.errors.dob}</p>
              )}
            </div>
            <div className="mt3">
              <label className="black">Password</label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="input-box-container input-reset"
                placeholder="Password"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="input-error">{formik.errors.password}</p>
              )}
            </div>
            <div className="mt3">
              <label className="black">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                className="input-box-container input-reset"
                placeholder="Confirm Password"
              />
              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <p className="input-error">{formik.errors.confirmPassword}</p>
              )}
            </div>
            <div className="mv3">
              <label className="black">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formik.values.occupation}
                onChange={formik.handleChange}
                className="input-box-container input-reset"
                placeholder="Occupation"
              />
            </div>
            <div>
              <button type="submit" id="signup" className="solid-buttton">
                Sign Up
              </button>
              <br />
              <div className="lh-copy mt3">
                <Link to="login" className="details-footer">
                  Already have an account?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
