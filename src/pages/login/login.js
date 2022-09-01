import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';

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
    <div>
      <h2 class="text-center mt-5 p-1">Log In</h2>
      <div className="d-flex justify-content-center details-container">
        <div class="d-flex justify-content-center align-items-center m-5">
          <div>
            <form className="w-300" onSubmit={formik.handleSubmit}>
              <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">
                  email
                </label>
                <div class="col-sm-10">
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    class="form-control form-style"
                    id="inputEmail3"
                    placeholder="name@email.com.au"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="input-error">{formik.errors.email}</p>
                  )}
                </div>
              </div>
              <div class="d-flex flex-row justify-content-between mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">
                  password
                </label>
                <div class="col-sm-10">
                  <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    class="form-control form-style"
                    id="inputPassword3"
                    placeholder="Password"
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="input-error">{formik.errors.password}</p>
                  )}
                </div>
              </div>
              <div class="d-flex flex-row justify-content-center">
                <button type="submit" class="btn auth-button" id="login">
                  Log in
                </button>
              </div>
              <div className="lh-copy mt3">
                <Link to="password/reset" className="details-footer">
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginplacehold;
