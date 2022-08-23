import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

import './styles.css';
import '../../index.css';

const Loginplacehold = (props) => {
  return (
    <>
      <div class="row mb-3">
        <label for="inputEmail3" class="col-sm-2 col-form-label-lg">
          Email
        </label>
        <div class="col-sm-3">
          <input type="email" class="form-control" placeholder="name@email.com.au" />
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputPassword3" class="col-sm-2 col-form-label-lg">
          Password
        </label>
        <div class="col-sm-3">
          <input type="password" class="form-control" placeholder="Password" />
        </div>
      </div>
    </>
  );
};

export default Loginplacehold;
