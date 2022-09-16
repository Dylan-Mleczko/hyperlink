import { React } from 'react';
import { Header } from '../../components/Header';
import { useLocation } from 'react-router-dom';
import { NewCollection } from '../../components/newCollection/NewCollection';

const Gallery = () => {
  const location = useLocation();

  return (
    <div>
      <Header
        isLoggedIn={true}
        userName={location?.state?.user?.name?.first}
        token={location?.state?.user?.token}
      />
      <div>
        <h1>hellllo</h1>
      </div>
    </div>
  );
};

export default Gallery;
