import { React, useEffect } from 'react';
import { Header } from '../../components/Header';
import { useLocation } from 'react-router-dom';
import { NewCollection } from '../../components/newCollection/NewCollection';
import { baseDevelopmentURL } from '../../utils/constants/index';
import axios from 'axios';

const Gallery = () => {
  const location = useLocation();

  // useEffect(() => {
  //   async function fetchData() {
  //     axios
  //       .get(`${baseDevelopmentURL}/user/all`, { withCredentials: true })
  //       .then((response) => {
  //         console.log(response.data.data.users);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="body">
      <Header />
      <div>
        <h1>hellllo</h1>
      </div>
    </div>
  );
};

export default Gallery;
