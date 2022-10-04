import './styles.css';
import { React, useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { useLocation } from 'react-router-dom';
import { TagFilterBox } from '../../components/tagFilterBox/TagFilterBox';
import axios from 'axios';
import { baseDevelopmentURL } from '../../utils/constants';
import { TagStore } from '../../store/TagStore';
import { CollectionBox } from '../../components/collectionBox/CollectionBox';

const Gallery = () => {
  const location = useLocation();

  const [tags, setTags] = useState();
  const [isTagsBusy, setTagsBusy] = useState(true);
  const selectedTagsStore = TagStore((state) => state.selectedTags);
  const [collections, setCollections] = useState();
  const [isCollectionsBusy, setCollectionsBusy] = useState(true);

  const filterByTags = (buttonClicked) => {
    console.log('button clicked', buttonClicked);
  };

  // retrieve tags then collections
  useEffect(() => {
    const fetchTags = async () => {
      axios
        .get(`${baseDevelopmentURL}/tag/all`, { withCredentials: true })
        .then((response) => {
          setTags(response.data.data.tags);
          setTagsBusy(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const fetchCollections = async () => {
      axios
        .get(`${baseDevelopmentURL}/collection/all`, { withCredentials: true })
        .then((response) => {
          setCollections(response.data.data.collections);
          setCollectionsBusy(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (isTagsBusy) {
      fetchTags();
      // console.log('tags acquired');
      // console.log(tags);
    }
    if (isCollectionsBusy) {
      fetchCollections();
      // console.log('collections acquired');
      // console.log(collections);
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
        {isTagsBusy ? (
          <h1>Loading.....</h1>
        ) : (
          <TagFilterBox tags={tags} handleClick={filterByTags}></TagFilterBox>
        )}
      </div>
      <div>
        {isCollectionsBusy ? (
          <h1>Loading.....</h1>
        ) : (
          <CollectionBox collections={collections}></CollectionBox>
        )}
      </div>
    </div>
  );
};

export default Gallery;
