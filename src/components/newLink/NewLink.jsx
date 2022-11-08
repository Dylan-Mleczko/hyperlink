import './styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseDevelopmentURL } from '../../utils/constants';
// import { baseDevelopmentURL, LOGIN, SIGNUP } from '../utils/constants/index';
import React, { useState } from 'react';
import { MagnifyingGlass, Circles } from 'react-loader-spinner';
import { useFormik } from 'formik';

import * as Yup from 'yup';

export const NewLink = ({ onCancel, collectionId, onSuccess }) => {
  let user;
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const formik = useFormik({
    initialValues: {
      uri: '',
      name: 'new Link',
      description: '',
    },
    validationSchema: Yup.object({
      uri: Yup.string().required('You must enter a link'),
      name: Yup.string().required('You must enter a name'),
      description: Yup.string().required('You must enter a description'),
    }),
    onSubmit: async (values) => {
      // console.log(values);
      setIsUploading(true);
      // alert(JSON.stringify(values, null, 2));
      axios
        .post(
          `${baseDevelopmentURL}/link/new`,
          {
            uri: values.uri,
            name: values.name,
            description: values.description,
            collection_id: collectionId,
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
          console.log(data);
          console.log('successfully created link!!!');
          onSuccess().then();
          setIsUploading(false);
          // localStorage.setItem('userName', user.name.first);
          // localStorage.setItem('userNameLast', user.name.last);
          // setFirstName(user.name.first);
        })
        .catch((err) => {
          setIsUploading(false);
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

  const handleScrape = () => {
    console.log('scraping!!!!');
    setIsScraping(true);

    axios
      .post(
        `${baseDevelopmentURL}/link/scrape`,
        {
          domain: document.getElementById('domain').value,
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
        console.log(data);
        console.log('successfully scrape the website!!!');

        // document.getElementById('name').setAttribute('value', data.title);
        // document.getElementById('description').setAttribute('value', data.description);
        // context.setFieldValue()
        if (data.title) {
          formik.setFieldValue('name', data.title);
        }
        if (data.description) {
          formik.setFieldValue('description', data.description);
        }
        setIsScraping(false);
        // document.getElementById('name').value = data.title;
        // document.getElementById('description').value = data.description;
      })
      .catch((err) => {
        console.log(err);
        setIsScraping(false);
        if (err.response.data) setError(err.response.data.message);
        else setError(err.message);
        // console.log(error);
        const errCode = err.response.status;
        if (errCode === 401) {
          localStorage.clear();
          navigate('/');
        }
      });
  };

  return (
    <div className="new-box">
      <h1 className="details-title ">Create a new link</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt3">
          <label className="black">Name</label>
          <input
            type="text"
            name="name"
            id="name"
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
            id="description"
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
            id="domain"
            value={formik.values.uri}
            onChange={formik.handleChange}
            placeholder="Enter uri"
            className="input-box-container input-reset"
          />
          <span
            className="btn btn-secondary"
            id="autoFill"
            onClick={handleScrape}
            type="scrape"
            value="scrape"
          >
            Auto Fill
          </span>
          <MagnifyingGlass
            visible={isScraping}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#4fa94d"
          />
          {/* <input class="btn btn-secondary" type="submit" value="Submit"></input> */}
          {formik.errors.uri && formik.touched.uri && (
            <p className="input-error">{formik.errors.uri}</p>
          )}
        </div>
        {error && <p className="submit-error">{error}</p>}
        <div className="loadingIcon">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={isUploading}
          />
        </div>
        <div className="button-container">
          <button type="submit" id="login" className="solid-buttton">
            Create Link
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
