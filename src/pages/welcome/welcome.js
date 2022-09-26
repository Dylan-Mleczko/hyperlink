import { React } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import '../../index.css';
import { Header } from '../../components/Header';

const Welcome = () => {
  const [theme, setTheme] = useState(null);
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const resetTheme = () => {
    setTheme(null);
  };

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
        <div
          className={`text-capitalize h1 mb-4 w-100 text-center text-${
            theme ? theme.toLowerCase() : 'secondary'
          }`}
        >
          {`${theme || 'Default'}`}
        </div>
        <div className="d-flex justify-content-center p-5">
          <Dropdown isOpen={dropdownOpen} toggle={() => setdropdownOpen(!dropdownOpen)}>
            <DropdownToggle color={theme} caret>
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setTheme('primary')}>Primary Theme</DropdownItem>
              <DropdownItem onClick={() => setTheme('danger')}>Danger Theme</DropdownItem>
              <DropdownItem onClick={() => setTheme('success')}>Success Theme</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={resetTheme}>Default Theme</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
