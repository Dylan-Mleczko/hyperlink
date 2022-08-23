import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

import './styles.css';
import '../../index.css';

const Loginplacehold = (props) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Your email is required'),
      password: Yup.string().min(8, 'Minimum 8 characters').required('You must enter a password'),
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
          <h1 className="details-title ">Log In</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt3">
              <label className="black">Email</label>
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="email"
                className="input-box-container input-reset"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="input-error">{formik.errors.email}</p>
              )}
            </div>
            <div className="mv3">
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
            <div>
              <button type="submit" id="login" className="solid-buttton">
                Log In
              </button>
              <br />
              <div className="lh-copy mt3">
                <Link to="password/reset" className="details-footer">
                  Forgot your password?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Loginplacehold;
