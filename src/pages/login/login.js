import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

import './styles.css';
import '../../index.css';
import { Container } from 'reactstrap';

const Loginplacehold = (props) => {
  return (
    <div className="d-flex justify-content-center details-container">
      <div class="d-flex justify-content-center align-items-center m-5">
        <div>
          <form className="w-300">
            <div class="row mb-3">
              <label for="inputEmail3" class="col-sm-2 col-form-label">
                username
              </label>
              <div class="col-sm-10">
                <input
                  type="email"
                  class="form-control form-style"
                  id="inputEmail3"
                  placeholder="name@email.com.au"
                />
              </div>
            </div>
            <div class="d-flex flex-row justify-content-between mb-3">
              <label for="inputPassword3" class="col-sm-2 col-form-label">
                password
              </label>
              <div class="col-sm-10">
                <input
                  type="password"
                  class="form-control form-style"
                  id="inputPassword3"
                  placeholder="Password"
                />
              </div>
            </div>
            <div class="d-flex flex-row justify-content-center">
              <button type="submit" class="btn auth-button">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginplacehold;
