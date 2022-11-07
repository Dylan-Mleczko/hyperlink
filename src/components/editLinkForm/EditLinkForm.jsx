import './styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseDevelopmentURL } from '../../utils/constants';
// import { baseDevelopmentURL, LOGIN, SIGNUP } from '../utils/constants/index';
import React, { useState } from 'react';
import { useFormik } from 'formik';

import * as Yup from 'yup';

export const EditLinkForm = ({ onCancel, onSuccess, data }) => {
  let user;
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  console.log(data);

  const formik = useFormik({
    initialValues: {
      uri: data.uri,
      name: data.name,
      description: data.description,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      uri: Yup.string().required('You must enter a link'),
      name: Yup.string().required('You must enter a name'),
      description: Yup.string().required('You must enter a description'),
    }),
    onSubmit: async (values) => {
      // console.log(values);
      // alert(JSON.stringify(values, null, 2));
      axios
        .put(
          `${baseDevelopmentURL}/link/${data._id}`,
          {
            linkDetails: {
              uri: values.uri,
              name: values.name,
              description: values.description,
            },
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          setError('');
          const data = response.data.data;
          console.log('successfully updated link!!!');
          onSuccess().then();
          // localStorage.setItem('userName', user.name.first);
          // localStorage.setItem('userNameLast', user.name.last);
          // setFirstName(user.name.first);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data) setError(err.response.data.message);
          else setError(err.message);
          // console.log(error);
          const errCode = err.response.status;
          if (errCode === 401) {
            localStorage.clear();
            navigate('/');
          }
        });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt3">
          <label className="black">Name</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Enter a name"
            className="input-box-container input-reset"
          />
          {formik.errors.name && formik.touched.name && (
            <p className="input-error">{formik.errors.name}</p>
          )}
        </div>
        <div className="mt3">
          <label className="black">Description</label>
          <input
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Enter a description"
            className="input-box-container input-reset"
          />
          {formik.errors.description && formik.touched.description && (
            <p className="input-error">{formik.errors.description}</p>
          )}
        </div>
        <div className="mt3">
          <label className="black">URI</label>
          <input
            type="text"
            name="uri"
            value={formik.values.uri}
            onChange={formik.handleChange}
            placeholder="Enter uri"
            className="input-box-container input-reset"
          />
          {formik.errors.uri && formik.touched.uri && (
            <p className="input-error">{formik.errors.uri}</p>
          )}
        </div>
        {error && <p className="submit-error">{error}</p>}
        <div className="button-container">
          <button type="submit" id="login" className="solid-buttton">
            Update
          </button>
          <button id="login" className="solid-buttton" onClick={onCancel}>
            Cancel
          </button>
          <br />
        </div>
      </form>
    </div>
  );
};
