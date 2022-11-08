import { React, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { Header } from '../../components/Header';
import { TagFilterBox } from '../../components/tagFilterBox/TagFilterBox';
import { baseDevelopmentURL } from '../../utils/constants';
import { TagStore } from '../../store/TagStore';
import { CollectionBox } from '../../components/collectionBox/CollectionBox';
import { NewCollection } from '../../components/newCollection/NewCollection';
import './styles.css';
import { Title } from '../../components/Title/Title';
import { EditBox } from '../../components/editBox/EditBox';

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
  const [displayCollection, setDisplayCollection] = useState({});

  const sortEnum = Object.freeze({ recent: 0, frequency: 1, created: 2 });
  const [sortMethod, setSortMethod] = useState(sortEnum.recent);

  const [searchString, setSearchString] = useState('');
  const [filterByFavourites, setFilterByFavourites] = useState(false);

  const filteredCollections = () => {
    return [...selectedCollections].filter((collection) => {
      if (filterByFavourites & !collection.favourite) {
        return false;
      }
      if (searchString === '') {
        return true;
      } else {
        return collection.name.toLowerCase().includes(searchString);
      }
    });
  };

  useEffect(() => {
    document.title = 'HyperLink - Gallery';
  }, []);

  const handleEdit = (collectionItem) => {
    // alert(JSON.stringify(linkItem));
    setDisplayCollection(collectionItem);
    document.getElementById('displayButton').click();
    // displayButton
  };

  const handleDeleteCollection = () => {
    axios
      .delete(`${baseDevelopmentURL}/collection/${displayCollection._id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('successfully deleted collection!!!');
        setDisplayCollection({});
        toast.success('Collection Deleted!', {
          position: 'top-center',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: 'delete',
        });
        handleAfterUpdate();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data) {
          toast.error(err.response.data.message, {
            position: 'top-center',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'delete',
          });
        } else {
          toast.error(err.message, {
            position: 'top-center',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'delete',
          });
        }
        const errCode = err.response.status;
        if (errCode === 401) {
          localStorage.clear();
          navigate('/');
        }
      });
  };

  const handleAfterUpdate = async () => {
    await fetchCollections();
  };

  const getCollections = async () => {
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
        setTags(u_tags);
      })
      .catch((error) => {
        console.log(error);
      });
    return curCollections;
  };

  const handleTagsApply = async () => {
    if (selectedTags.length === 0) {
      setSelectedCollections(collections);
      return;
    }

    setSelectedCollections(
      [...collections].filter((collection) => {
        return collection.tags.map((tag) => tag.name).some((tag) => selectedTags?.includes(tag));
      })
    );
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

        // update favourite value of collections
        var newCollections = [...collections];
        console.log(collection.name);
        const id = newCollections.findIndex((c) => c.name == collection.name);
        newCollections[id].favourite = response.data.data.collection.favourite;
        setCollections(newCollections);

        // update favourite value of selected collections if the collection is there
        var newSelectedCollections = [...selectedCollections];
        const selectedId = newSelectedCollections.findIndex((c) => c.name == collection.name);
        newSelectedCollections[selectedId].favourite = response.data.data.collection.favourite;
        setSelectedCollections(newSelectedCollections);
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
    console.log('sort method', sortMethod);
    switch (sortMethod) {
      case sortEnum.recent:
        console.log('sorting on recent');
        handleSortOnRecent();
        break;
      case sortEnum.frequency:
        console.log('sorting on frequency');
        handleSortOnFrequency();
        break;
      case sortEnum.created:
        console.log('sorting on creation');
        handleSortOnCreation();
        break;
    }
  };

  const updateCollections = useCallback(async () => {
    const curCollections = await getCollections();
    console.log('got collections', curCollections);
    setCollections(curCollections);
    setSelectedCollections(curCollections);
    console.log('update collections');
    // sortCollections();
    setBusy(false);
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    // function fixes initial loading of collections data
    const initialUpdateCollections = async () => {
      const curCollections = await getCollections();
      if (isSubscribed) {
        setCollections(curCollections);
        setSelectedCollections(curCollections);
        setBusy(false);
      }
    };

    initialUpdateCollections().catch(console.error);

    return () => (isSubscribed = false);
  }, []);

  // after selectedTags changed, to apply tags filter
  useEffect(() => {
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
          <div className="form-outline">
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search Collections"
              aria-label="Search"
              onChange={(e) => setSearchString(e.target.value.toLowerCase())}
            />
          </div>
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
          <input
            type="radio"
            className="btn-check"
            name="options-outlined"
            id="primary-outlined"
            autoComplete="off"
            defaultChecked
            onClick={() => setFilterByFavourites(false)}
          />
          <div>
            <label className="btn btn-outline-primary" htmlFor="primary-outlined">
              All
            </label>

            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="success-outlined"
              autoComplete="off"
            />
            <label
              className="btn btn-outline-success"
              htmlFor="success-outlined"
              onClick={() => setFilterByFavourites(true)}
            >
              Favourites
            </label>
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
              onSuccessName={handleAfterCreate}
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
              collections={filteredCollections()}
              favouriteCollection={favouriteCollection}
              handleEdit={handleEdit}
            ></CollectionBox>
          )}
        </div>
      </div>
      <EditBox
        isLink={false}
        title={displayCollection.name}
        data={displayCollection}
        onUpdate={handleAfterUpdate}
        onDelete={handleDeleteCollection}
      ></EditBox>
    </div>
  );
};

export default Gallery;
