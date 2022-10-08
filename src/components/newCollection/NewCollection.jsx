import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { baseDevelopmentURL, LOGIN, SIGNUP } from '../utils/constants/index';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const NewCollection = ({ isLoggedIn, userName, token, page }) => {
  const [error, setError] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: 'new collection',
      description: '',
      tags: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('You must enter a title'),
      description: Yup.string().required('You must enter a description'),
      tags: Yup.string(),
      image: Yup.mixed(),
    }),
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      axios
        .post(`${baseDevelopmentURL}/collection/new`, { userDetails }, { withCredentials: true })
        .then((response) => {
          const user = response.data.newUser;
          localStorage.setItem('userName', user.name.first);
          localStorage.setItem('userNameLast', user.name.last);
          setFirstName(user.name.first);
        })
        .catch((error) => {
          console.log(error);
          const errCode = error.response.status;
          if (errCode === 401) {
            localStorage.clear();
            navigate('/');
          }
        });
    },
  });

  return (
    <div className="new-box">
      <h1 className="details-title ">Create a new collection</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt3">
          <label className="black">Title</label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder="Enter a title"
            className="input-box-container input-reset"
          />
          {formik.errors.title && formik.touched.title && (
            <p className="input-error">{formik.errors.title}</p>
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
          <label className="black">Tags</label>
          <input
            type="text"
            name="tags"
            value={formik.values.tags}
            onChange={formik.handleChange}
            placeholder="Enter tags"
            className="input-box-container input-reset"
          />
          {formik.errors.tags && formik.touched.tags && (
            <p className="input-error">{formik.errors.tags}</p>
          )}
        </div>
        <div className="mv3">
          <label className="black">Image</label>
          <input
            id="file"
            name="image"
            type="file"
            accept="image/*"
            value={formik.values.image}
            onChange={formik.handleChange}
            // onChange={(event) => {
            //   setFieldValue('file', event.currentTarget.files[0]);
            // }}
            className="form-control"
          />
          {formik.errors.image && formik.touched.image && (
            <p className="input-error">{formik.errors.image}</p>
          )}
        </div>
        <div>
          <button type="submit" id="login" className="solid-buttton">
            Create Collection
          </button>
          <br />
        </div>
      </form>
    </div>
  );
};
