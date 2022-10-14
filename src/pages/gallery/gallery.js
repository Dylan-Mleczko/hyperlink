import { React, useState, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

import { Header } from '../../components/Header';
import { TagFilterBox } from '../../components/tagFilterBox/TagFilterBox';
import { baseDevelopmentURL } from '../../utils/constants';
import { TagStore } from '../../store/TagStore';
import { CollectionBox } from '../../components/collectionBox/CollectionBox';
import './styles.css';

const Gallery = () => {
  const location = useLocation();

  const [collections, setCollections] = useState();
  const [selectedCollections, setSelectedCollections] = useState();
  const [isBusy, setBusy] = useState(true);
  const selectedTags = TagStore((state) => state.selectedTags);

  const updateCollections = async () => {
    var curCollections = null;
    await axios
      .get(`${baseDevelopmentURL}/collection/all`, { withCredentials: true })
      .then((response) => {
        setCollections(response.data.data.collections);
        curCollections = response.data.data.collections;
      })
      .catch((error) => {
        console.log(error);
      });
    return curCollections;
  };

  const handleTagsApply = async () => {
    console.log('filtering by tags');

    // this line causes lots of lag
    // await updateCollections();

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

  const removeTagsFilter = async () => {
    console.log('removing filter by tags');

    // this line causes lots of lag
    // await updateCollections();

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
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    await updateCollections();
  };

  // retrieve collections
  useEffect(() => {
    const initiateCollections = async () => {
      const curCollections = await updateCollections();
      setCollections(curCollections);
      setSelectedCollections(curCollections);
      setBusy(false);
    };

    if (isBusy) {
      initiateCollections();
    }
  }, [selectedCollections]);

  return (
    <div className="body">
      <Header
        isLoggedIn={true}
        userName={location?.state?.user?.name?.first}
        token={location?.state?.user?.token}
      />
      <div>
        {isBusy ? (
          <ThreeDots
            height="100"
            width="100"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass="loader"
          />
        ) : (
          <TagFilterBox
            collections={collections}
            handleApplyClick={handleTagsApply}
            handleCancelClick={removeTagsFilter}
          ></TagFilterBox>
        )}
      </div>
      <div>
        {isBusy ? (
          <ThreeDots
            height="100"
            width="100"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass="loader"
          />
        ) : (
          <CollectionBox
            collections={selectedCollections}
            favouriteCollection={favouriteCollection}
          ></CollectionBox>
        )}
      </div>
    </div>
  );
};

export default Gallery;
