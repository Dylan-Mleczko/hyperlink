import { React } from 'react';
import { Header } from '../../components/Header';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  return (
    <div>
      <Header isLoggedIn={true} userName={location?.state?.user?.name?.first} />
      <div>
        <h1>hellllo</h1>
      </div>
    </div>
  );
};

export default Home;
