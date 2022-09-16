import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { baseDevelopmentURL, LOGIN, SIGNUP } from '../utils/constants/index';
import './header.css';

export const Header = ({ isLoggedIn, userName, token, page }) => {
  const navigate = useNavigate();
  const id = 'logout';

  const logoutUser = async (token) => {
    try {
      const res = await axios.post(`${baseDevelopmentURL}/logout`, {
        data: {
          token: token,
        },
      });

      if (res.data.message === 'Successfully logged out') {
        navigate('/');
      }
    } catch (err) {
      toast.error(err.response.data, {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: id,
      });
    }
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg nav-bar p-0">
      <div className="container-fluid">
        {isLoggedIn ? (
          <Link to={'/gallery'} className="pointer navbar-brand fs-2">
            Hyper_Link
          </Link>
        ) : (
          <a href="/" className="pointer navbar-brand fs-2">
            Hyper_Link
          </a>
        )}

        <div
          className="collapse navbar-collapse d-flex flex-row justify-content-end"
          id="navbarNav"
        >
          <nav className="navbar">
            <form className="container-fluid justify-content-start">
              {!isLoggedIn ? (
                <>
                  {page === SIGNUP ? (
                    <Link to={'/login'}>
                      <button className="btn nav-button me-2" type="button">
                        Log in
                      </button>
                    </Link>
                  ) : page === LOGIN ? (
                    <Link to={'/signup'}>
                      <button className="btn nav-button m-2" type="button">
                        Sign up
                      </button>
                    </Link>
                  ) : (
                    <>
                      <Link to={'/login'}>
                        <button className="btn nav-button me-2" type="button">
                          Log in
                        </button>
                      </Link>
                      <Link to={'/signup'}>
                        <button className="btn nav-button m-2" type="button">
                          Sign up
                        </button>
                      </Link>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="m-3 fs-5">Hi, {userName}!</div>
                  <button
                    className="btn nav-button m-2"
                    type="button"
                    onClick={() => logoutUser(token)}
                  >
                    Log out
                  </button>
                </>
              )}
            </form>
          </nav>
        </div>
      </div>
    </nav>
  );
};
