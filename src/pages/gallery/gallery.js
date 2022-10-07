import './styles.css';
import { React, useState, useEffect, useLayoutEffect } from 'react';
import { Header } from '../../components/Header';
import { useLocation } from 'react-router-dom';
import { TagFilterBox } from '../../components/tagFilterBox/TagFilterBox';
import axios from 'axios';
import { baseDevelopmentURL } from '../../utils/constants';
import { TagStore } from '../../store/TagStore';
import { CollectionBox } from '../../components/collectionBox/CollectionBox';

const Gallery = () => {
  const location = useLocation();

  const [collections, setCollections] = useState();
  const [isBusy, setBusy] = useState(true);
  const selectedTagsStore = TagStore((state) => state.selectedTags);

  const filterByTags = (buttonClicked) => {
    console.log('button clicked', buttonClicked);
  };

  // retrieve collections
  useEffect(() => {
    const fetchCollections = async () => {
      axios
        .get(`${baseDevelopmentURL}/collection/all`, { withCredentials: true })
        .then((response) => {
          setCollections(response.data.data.collections);
          console.log(response.data.data.collections);
          setBusy(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (isBusy) {
      fetchCollections();
    }
  }, []);

  return (
    <div className="body">
      <Header
        isLoggedIn={true}
        userName={location?.state?.user?.name?.first}
        token={location?.state?.user?.token}
      />
      <div>
        {isBusy ? (
          <h1>Loading.....</h1>
        ) : (
          <TagFilterBox
            tags={collections.map((collection) => collection.tags).flat()}
            handleClick={filterByTags}
          ></TagFilterBox>
        )}
      </div>
      <div>
        {isBusy ? <h1>Loading.....</h1> : <CollectionBox collections={collections}></CollectionBox>}
      </div>
    </div>
  );
};

export default Gallery;
