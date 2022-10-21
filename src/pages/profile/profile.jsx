import { React, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title/Title';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { baseDevelopmentURL } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
// import 'font-awesome/css/font-awesome.min.css';
import './styles.css';

const Profile = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [firstName, setFirstName] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${baseDevelopmentURL}/user`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const user = response.data.user;
          if (
            localStorage.getItem('userName') !== user.name.first ||
            localStorage.getItem('userNameLast') !== user.name.last
          ) {
            localStorage.setItem('userName', user.name.first);
            localStorage.setItem('userNameLast', user.name.last);
          }
        })
        .catch((error) => {
          const errCode = error.response.status;
          if (errCode === 401) {
            localStorage.clear();
            navigate('/');
          }
        });
    };
    fetchData();

    document.title = 'HyperLink - Profile';
  }, [firstName]);

  const formik = useFormik({
    initialValues: {
      firstName: localStorage.getItem('userName'),
      lastName: localStorage.getItem('userNameLast'),
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, 'Mininum 2 characters')
        .max(30, 'Maximum 30 characters')
        .required('Your first name is required'),
      lastName: Yup.string()
        .min(2, 'Mininum 2 characters')
        .max(30, 'Maximum 30 characters')
        .required('Your last name is required'),
    }),
    onSubmit: async (values) => {
      const userDetails = { first_name: values.firstName, last_name: values.lastName };
      // console.log(userDetails);
      axios
        .post(
          `${baseDevelopmentURL}/user/update`,
          { userDetails },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
            },
          }
        )
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
      // alert(JSON.stringify(values, null, 2));
      setIsEditMode(false);
    },
  });
  return (
    <div>
      <Header isLoggedIn={true} />
      <div className="fix-padding"></div>
      <div className="body">
        <div className="content">
          <Title text={'My Profile'} />
          <div className="edit-box">
            <button
              className="edit-button"
              onClick={() => {
                setIsEditMode(true);
                console.log(isEditMode);
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt3">
                <label className="black">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  disabled={!isEditMode}
                  placeholder="Enter your first name here"
                  className="input-box-container input-reset"
                />
                {formik.errors.firstName && formik.touched.firstName && (
                  <p className="input-error">{formik.errors.firstName}</p>
                )}
              </div>
              <div className="mt3">
                <label className="black">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  disabled={!isEditMode}
                  placeholder="Enter your first name here"
                  className="input-box-container input-reset"
                />
                {formik.errors.lastName && formik.touched.lastName && (
                  <p className="input-error">{formik.errors.lastName}</p>
                )}
              </div>
              {isEditMode ? (
                <button
                  type="submit"
                  id="login"
                  className="solid-buttton"
                  style={{ marginTop: ' 10px' }}
                  display="false"
                >
                  Confirm
                </button>
              ) : null}
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
