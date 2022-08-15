import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Welcome from '../pages/welcome/welcome';
import Home from '../pages/home/home';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Profile from '../pages/profile/profile';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/gallery" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
