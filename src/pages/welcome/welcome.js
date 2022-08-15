import { React } from 'react';
import { Link } from 'react-router-dom';

import '../../index.css';

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to hyper-link</h1>
      <Link to={'/login'} id="login" className="solid-buttton">
        Login
      </Link>
      <Link to={'/signup'} id="signup" className="solid-buttton">
        Signup
      </Link>
    </div>
  );
};

export default Welcome;
