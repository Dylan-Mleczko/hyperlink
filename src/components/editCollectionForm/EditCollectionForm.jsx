import './styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseDevelopmentURL } from '../../utils/constants';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Circles } from 'react-loader-spinner';

import * as Yup from 'yup';

export const EditCollectionForm = ({ onCancel, onSuccess, data }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('/avatars/default.png');
  const [isUploading, setIsUploading] = useState(false);
  var oldTags = [];

  data.tags.forEach((tag) => {
    oldTags.push(tag.name);
  });
  const tagString = oldTags.toString();

  const formik = useFormik({
    initialValues: {
      name: data.name,
      description: data.description,
      tags: tagString,
      image: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('You must enter a name'),
      description: Yup.string().required('You must enter a description'),
      tags: Yup.string(),
    }),
    onSubmit: async (values) => {
      // console.log(values);
      // alert(JSON.stringify(values, null, 2));
      setIsUploading(true);
      let formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      // formData.append('image', values.image);
      formData.append('tags', values.tags);
      // console.log(formData);
      axios
        .put(
          `${baseDevelopmentURL}/collection/${data._id}`,
          {
            formData: {
              name: values.name,
              description: values.description,
              tags: values.tags,
              image: values.image,
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
          const collection = response.data.data.collection;
          console.log(collection);
          onSuccess().then();
          setIsUploading(false);
        })
        .catch((err) => {
          setIsUploading(false);
          console.log(err);
          if (err.response.data) setError(err.response.data.message);
          else setError(err.message);
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
          <label className="black">Title</label>
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
            onChange={(e) => {
              const fileReader = new FileReader();
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  formik.setFieldValue('image', fileReader.result);
                  console.log(fileReader.result);
                  setAvatarPreview(fileReader.result);
                }
              };
              fileReader.readAsDataURL(e.target.files[0]);
            }}
            className="form-control"
          />
          {formik.errors.image && formik.touched.image && (
            <p className="input-error">{formik.errors.image}</p>
          )}
        </div>
        <div className="image-container">
          <img className="image" src={avatarPreview} alt="" />
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
