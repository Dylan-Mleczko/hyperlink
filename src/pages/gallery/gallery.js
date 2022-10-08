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
  const [selectedCollections, setSelectedCollections] = useState();
  const [isBusy, setBusy] = useState(true);
  const selectedTags = TagStore((state) => state.selectedTags);

  const tagsFilter = () => {
    console.log('filtering by tags');
    setSelectedCollections(
      collections.filter((collection) => {
        for (const tag of collection.tags) {
          if (selectedTags.includes(tag.name)) {
            return true;
          }
        }
        return false;
      })
    );
    console.log('found', selectedCollections);
  };

  const removeTagsFilter = () => {
    console.log('removing filter by tags');
    setSelectedCollections(collections);
  };

  const favouriteCollection = async (collection) => {
    console.log('update collection favourited', collection.name);
    axios
      .put(`${baseDevelopmentURL}/collection/${collection._id}`, {
        withCredentials: true,
        collectionDetails: { favourite: !collection.favourite },
      })
      .then((response) => {
        const updatedCollection = response.data.data.collection;
        setCollections(
          collections.map((collection) => {
            return collection._id === updatedCollection._id ? updatedCollection : collection;
          })
        );
        setSelectedCollections(
          collections.map((collection) => {
            return collection._id === updatedCollection._id ? updatedCollection : collection;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // retrieve collections
  useEffect(() => {
    const fetchCollections = async () => {
      axios
        .get(`${baseDevelopmentURL}/collection/all`, { withCredentials: true })
        .then((response) => {
          setCollections(response.data.data.collections);
          setSelectedCollections(response.data.data.collections);
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
            handleApplyClick={tagsFilter}
            handleCancelClick={removeTagsFilter}
          ></TagFilterBox>
        )}
      </div>
      <div>
        {isBusy ? (
          <h1>Loading.....</h1>
        ) : (
          <CollectionBox
            collections={selectedCollections}
            favouriteFunction={favouriteCollection}
          ></CollectionBox>
        )}
      </div>
    </div>
  );
};

export default Gallery;
