import { React, useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { useLocation } from 'react-router-dom';
import { SelectedTags } from '../../components/selectedTags/SelectedTags';
import axios from 'axios';
import { baseDevelopmentURL } from '../../utils/constants';

const Gallery = () => {
  const location = useLocation();

  const [tags, setTags] = useState();
  const [collections, setCollections] = useState();
  const [isBusy, setBusy] = useState(true);

  // retrieve tags
  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_API_BASE}/api/v1/endpoint/`;
      axios
        .get(`${baseDevelopmentURL}/tag/all`, { withCredentials: true })
        .then((response) => {
          setBusy(false);
          setTags(response.data.data.tags);
          console.log(response.data.data.tags);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (isBusy) {
      fetchData();
    }
  }, []);

  console.log(tags);

  // retrieve collections
  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_API_BASE}/api/v1/endpoint/`;
      axios
        .get(`${baseDevelopmentURL}/collection/all`, { withCredentials: true })
        .then((response) => {
          setBusy(false);
          setCollections(response.data.data.collections);
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
      <div>{isBusy ? <h1>Loading.....</h1> : <SelectedTags tagNames={tags}></SelectedTags>}</div>
    </div>
  );
};

export default Gallery;
