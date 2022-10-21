import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './styles.css';
import '../../index.css';
import { baseDevelopmentURL } from '../../utils/constants';
import { Header } from '../../components/Header';

const EndResestPassword = (props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get('email');

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().min(8, 'Minimum 8 characters').required('You must enter a password'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Password does not match')
        .required('You must enter a password'),
    }),
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      try {
        await axios.post(`${baseDevelopmentURL}/end/reset`, {
          data: {
            email: email,
            password: values.password,
          },
        });

        navigate('/login', { state: { email: email, resetSuccess: true } });
      } catch (err) {
        setErrorMessage(err.message);
        setError(true);
      }
    },
  });

  useEffect(() => {
    document.title = 'HyperLink - Reset Password';
  }, []);

  return (
    <div className="body">
      <Header />
      <div className="fix-padding"></div>
      <div className="details-container">
        <main className="details-main">
          <div className="measure">
            <h1 className="details-title ">Reset password</h1>
            <form onSubmit={formik.handleSubmit}>
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
              <div className="mv3">
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
                )}{' '}
                {error && <p className="input-error">{errorMessage}</p>}
              </div>
              <div>
                <button type="submit" id="login" className="solid-buttton">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EndResestPassword;
