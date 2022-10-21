import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Welcome from '../pages/welcome/welcome';
import Gallery from '../pages/gallery/gallery';
import Collections from '../pages/colletions/Collections';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Profile from '../pages/profile/profile';
import StartResestPassword from '../pages/resetPassword/startResetPassword';
import EndResestPassword from '../pages/resetPassword/endResetPassword';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Welcome />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/password/start/reset" element={<StartResestPassword />} />
      <Route path="/password/end/reset" element={<EndResestPassword />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
