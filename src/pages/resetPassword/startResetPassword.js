import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './styles.css';
import '../../index.css';
import { baseDevelopmentURL } from '../../utils/constants';
import { Header } from '../../components/Header';

const StartResestPassword = (props) => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Your email is required'),
    }),
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      try {
        const res = await axios.post(`${baseDevelopmentURL}/start/reset`, {
          data: {
            email: values.email,
          },
        });
        setError(false);
        setSuccess(true);
        setSuccessMessage(`Email has been sent successfully to ${values.email} to reset password`);

        //navigate('/password/reset/end');
      } catch (err) {
        setSuccess(false);
        setErrorMessage(err.response.data.message);
        setError(true);
      }
    },
  });

  return (
    <div className="body">
      <Header />
      <div className="fix-padding"></div>
      <div className="details-container">
        <main className="details-main">
          <div className="measure">
            <h1 className="details-title ">Forgot password</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="mv3">
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
                {error && <p className="input-error">{errorMessage}</p>}
                {success && <p className="input-success">{successMessage}</p>}
              </div>
              <div>
                <button type="submit" id="login" className="solid-buttton">
                  Send email
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StartResestPassword;
