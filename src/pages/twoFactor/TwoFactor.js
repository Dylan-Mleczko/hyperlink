import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import './styles.css';
import '../../index.css';
import { baseDevelopmentURL } from '../../utils/constants';
import { Header } from '../../components/Header';

const TwoFactor = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().required('Your code is required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${baseDevelopmentURL}/verify/email`, {
          data: {
            code: values.code,
          },
        });

        console.log('test', res);

        const valData = location.state.values;

        // to generate the user token and ID and storing in the response
        const login = await axios.post(`${baseDevelopmentURL}/login`, {
          data: {
            email: valData.email,
            password: valData.password,
          },
        });

        const user = login.data.user;

        localStorage.setItem('access_token', user.token);
        localStorage.setItem('userName', user.name.first);
        localStorage.setItem('userNameLast', user.name.last);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userEmail', user.email);

        navigate('/gallery', { state: { user } });
      } catch (err) {
        setSuccess(false);
        setErrorMessage(err.response.data.message);
        setError(true);
      }
    },
  });

  useEffect(() => {
    document.title = 'HyperLink - Verify Email';
  }, []);

  return (
    <div className="body">
      <Header />
      <div className="fix-padding"></div>
      <div className="details-container">
        <main className="details-main">
          <div className="measure">
            <h1 className="details-title ">Enter Sign Up code</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="mv3">
                <label className="black">Code</label>
                <input
                  type="text"
                  name="code"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  placeholder="code"
                  className="input-box-container input-reset"
                />
                {formik.errors.code && formik.touched.code && (
                  <p className="input-error">{formik.errors.code}</p>
                )}
                {error && <p className="input-error">{errorMessage}</p>}
                {success && <p className="input-success">{successMessage}</p>}
              </div>
              <div>
                <button type="submit" id="login" className="solid-buttton">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TwoFactor;
