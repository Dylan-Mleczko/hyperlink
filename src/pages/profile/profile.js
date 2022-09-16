import { React } from 'react';
import { Header } from '../../components/Header';

const Profile = () => {
  return (
    <div className="body">
      <Header isLoggedIn={true} />
      Hi
    </div>
  );
};

export default Profile;
