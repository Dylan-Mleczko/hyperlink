import { React, useState, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

import { Header } from '../../components/Header';
import { TagFilterBox } from '../../components/tagFilterBox/TagFilterBox';
import { baseDevelopmentURL } from '../../utils/constants';
import { TagStore } from '../../store/TagStore';
import { CollectionBox } from '../../components/collectionBox/CollectionBox';
import { NewCollection } from '../../components/newCollection/NewCollection';
import './styles.css';
import { Title } from '../../components/Title/Title';

const Gallery = () => {
  const location = useLocation();

  const [collections, setCollections] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const selectedTags = TagStore((state) => state.selectedTags);
  const clearTags = TagStore((state) => state.clearTags);
  const [tags, setTags] = useState([]);
  const [isNewCollection, setIsNewCollection] = useState(false);
  const [isFilterBoxDisplay, setIsFilterBoxDisplay] = useState(false);

  useEffect(() => {
    document.title = 'HyperLink - Gallery';
  }, []);

  const updateCollections = async () => {
    var curCollections = null;
    await axios
      .get(`${baseDevelopmentURL}/collection/all`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        // withCredentials: true,
      })
      .then((response) => {
        setCollections(response.data.data.collections);
        curCollections = response.data.data.collections;

        const u_tags = [];
        curCollections
          ?.map((collection) => collection.tags)
          .flat()
          .forEach((tag) => {
            let found = false;
            u_tags.forEach((utag) => {
              if (utag.name === tag.name) found = true;
            });
            if (!found) {
              u_tags.push(tag);
            }
          });
        console.log('tags: ', u_tags);
        setTags(u_tags);
      })
      .catch((error) => {
        console.log(error);
      });
    return curCollections;
  };

  const handleTagsApply = async () => {
    // console.log('filtering by tags');
    if (selectedTags.length === 0) {
      setSelectedCollections(collections);
      return;
    }

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
    clearTags();
    setSelectedCollections(collections);
  };

  const favouriteCollection = async (collection) => {
    console.log('update collection favourited', collection.name);
    axios
      .put(
        `${baseDevelopmentURL}/collection/${collection._id}`,
        { collectionDetails: { favourite: !collection.favourite } },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response);
        updateCollections().then();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const newCollectionOnclick = () => {
    setIsNewCollection(true);
  };

  const handleCancelCreate = () => {
    setIsNewCollection(false);
  };

  const fetchCollections = async () => {
    const curCollections = await updateCollections();
    setCollections(curCollections);
    setSelectedCollections(curCollections);
    setBusy(false);
  };

  function handleSortOnRecent() {
    const newSelectedCollections = [...selectedCollections].sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );
    setSelectedCollections(newSelectedCollections);
  }

  function handleSortOnFrequency() {
    const newSelectedCollection = [...selectedCollections].sort(
      (a, b) => b.click_count - a.click_count
    );
    setSelectedCollections(newSelectedCollection);
  }

  function handleSortOnCreation() {
    console.log('sorting collections on creation');
    console.log(
      'sorted collections = ',
      selectedCollections.sort((a, b) => new Date(b.create_at) - new Date(a.create_at))
    );
    setSelectedCollections(
      selectedCollections.sort((a, b) => new Date(b.create_at) - new Date(a.create_at))
    );
  }

  useEffect(() => {
    if (isBusy) {
      fetchCollections();
    }
  }, [selectedCollections]);

  //after selectedTags changed, to apply tags filter
  useEffect(() => {
    handleTagsApply().then();
  }, [collections]);

  const handleAfterCreate = async () => {
    await fetchCollections();
    setIsNewCollection(false);
  };

  const filterBoxOnclick = () => {
    setIsFilterBoxDisplay(!isFilterBoxDisplay);
  };

  return (
    <div className="body">
      <Header
        isLoggedIn={true}
        userName={location?.state?.user?.name?.first}
        token={location?.state?.user?.token}
      />
      <div className="content">
        <div className="fix-padding"></div>
        <Title text="Gallery" />
        <div className="action-container">
          <button onClick={filterBoxOnclick}>FilterBy</button>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort By
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button className="dropdown-item" onClick={() => handleSortOnFrequency()}>
                Most Frequent
              </button>
              <button className="dropdown-item" onClick={() => handleSortOnRecent()}>
                Last Used
              </button>
              <button className="dropdown-item" onClick={() => handleSortOnCreation()}>
                Date Created
              </button>
            </div>
          </div>
          <button onClick={newCollectionOnclick} className="new-collection-button">
            + New Collection
          </button>
        </div>
        {isNewCollection ? (
          <div className="new-collection-container">
            <NewCollection
              onCancel={handleCancelCreate}
              onSuccess={handleAfterCreate}
            ></NewCollection>
          </div>
        ) : null}
        <div>
          {isBusy && !isFilterBoxDisplay ? (
            <ThreeDots
              height="100"
              width="100"
              radius="9"
              color="green"
              ariaLabel="three-dots-loading"
              wrapperStyle
              wrapperclassName="loader"
            />
          ) : (
            isFilterBoxDisplay && (
              <TagFilterBox
                tags={tags}
                handleApplyClick={handleTagsApply}
                handleCancelClick={removeTagsFilter}
              ></TagFilterBox>
            )
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
              wrapperclassName="loader"
            />
          ) : (
            <CollectionBox
              collections={selectedCollections}
              favouriteCollection={favouriteCollection}
            ></CollectionBox>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
