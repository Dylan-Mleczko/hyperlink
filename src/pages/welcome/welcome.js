import { React } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import '../../index.css';
import { Header } from '../../components/Header';

const Welcome = () => {
  return (
    <div className="body">
      <Header />
      <div className="mb-2">
        <h1>Welcome to hyper-link</h1>
        <Link to={'/login'} id="login" className="solid-buttton">
          Login
        </Link>
        <Link to={'/signup'} id="signup" className="solid-buttton">
          Signup
        </Link>
        {/* demo: please don't keep this forever */}
      </div>
    </div>
  );
};

export default Welcome;
