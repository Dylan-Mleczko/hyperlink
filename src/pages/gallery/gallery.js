import { React, useState, useEffect, useCallback } from 'react';
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
import { select } from 'react-cookies';

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

  const sortEnum = Object.freeze({ recent: 0, frequency: 1, created: 2 });
  const [sortMethod, setSortMethod] = useState(sortEnum.recent);

  const [searchString, setSearchString] = useState('');

  let inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearchString(lowerCase);
  };

  const filteredCollections = () => {
    return selectedCollections.filter((e) => {
      if (searchString === '') {
        return e;
      } else {
        return e.text.includes(inputString);
      }
    });
  };

  useEffect(() => {
    document.title = 'HyperLink - Gallery';
  }, []);

  const getCollections = async () => {
    console.log('fetching collections');
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
        // console.log('Tags: ', u_tags);
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
    await axios
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
        getCollections().then();
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

  function handleSortOnRecent() {
    setCollections(
      [...collections].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    );
    setSelectedCollections(
      [...selectedCollections].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    );
    setSortMethod(sortEnum.recent);
  }

  function handleSortOnFrequency() {
    setCollections([...collections].sort((a, b) => b.click_count - a.click_count));
    setSelectedCollections([...selectedCollections].sort((a, b) => b.click_count - a.click_count));
    setSortMethod(sortEnum.frequency);
  }

  function handleSortOnCreation() {
    setCollections(
      [...collections].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    );
    setSelectedCollections(
      [...selectedCollections].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    );
    setSortMethod(sortEnum.created);
  }

  const sortCollections = () => {
    switch (sortMethod) {
      case sortEnum.recent:
        console.log('sorting on recent');
        handleSortOnRecent(collections);
        break;
      case sortEnum.frequency:
        console.log('sorting on frequency');
        handleSortOnFrequency(collections);
        break;
      case sortEnum.created:
        console.log('sorting on creation');
        handleSortOnCreation(collections);
        break;
    }
  };

  const updateCollections = useCallback(async () => {
    const curCollections = await getCollections();
    setCollections(curCollections);
    setSelectedCollections(curCollections);
    // sortCollections(sortMethod);
    setBusy(false);
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    const initialUpdateCollections = async () => {
      const curCollections = await getCollections();
      if (isSubscribed) {
        setCollections(curCollections);
        setSelectedCollections(curCollections);
        // sortCollections(sortMethod);
        setBusy(false);
      }
    };

    initialUpdateCollections().catch(console.error);

    return () => (isSubscribed = false);
  }, []);

  // after selectedTags changed, to apply tags filter
  useEffect(() => {
    console.log('handle tags apply');
    handleTagsApply().then();
  }, [collections]);

  const handleAfterCreate = async () => {
    await updateCollections();
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
        <div className="form-outline">
          <input
            type="search"
            id="form1"
            className="form-control"
            placeholder="Search Collections"
            aria-label="Search"
            onChange={inputHandler}
          />
        </div>
        {/* <div className="input-group rounded">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search Collections"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search"></i>
          </span>
        </div> */}
        <div className="action-container">
          <button className="btn btn-secondary" onClick={filterBoxOnclick} width="fit-content">
            Filter By Tags
          </button>
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
          <button
            className="btn btn-secondary"
            onClick={newCollectionOnclick}
            // position="absolute"
            // margin-bottom="5rem"
            // right="19%"
            // className="new-collection-button"
          >
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
