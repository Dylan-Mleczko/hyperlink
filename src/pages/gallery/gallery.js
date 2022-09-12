import { React, useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { useLocation } from 'react-router-dom';
import { SelectedTags } from '../../components/selectedTags/SelectedTags';
import axios from 'axios';
import { baseDevelopmentURL } from '../../utils/constants';

const Gallery = () => {
  const location = useLocation();
  var tags = [{ name: 'hello' }, { name: 'world' }];
  const [data, setData] = useState();
  const [isBusy, setBusy] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      // setBusy(true);
      const url = `${process.env.REACT_APP_API_BASE}/api/v1/endpoint/`;
      axios
        .get(`${baseDevelopmentURL}/collection/all`, { withCredentials: true })
        .then((response) => {
          setBusy(false);
          setData(response.data.data.collections);
          console.log(response.data.data.collections);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (isBusy) {
      fetchData();
    }
  }, []);
  return (
    <div>
      <Header
        isLoggedIn={true}
        userName={location?.state?.user?.name?.first}
        token={location?.state?.user?.token}
      />
      <div>
        {isBusy ? (
          <h1>Loading.....</h1>
        ) : (
          data.map((value) => {
            return <p key={value._id}>{value._id}</p>;
          })
        )}
      </div>
      <SelectedTags tagNames={tags}></SelectedTags>
    </div>
  );
};

export default Gallery;
