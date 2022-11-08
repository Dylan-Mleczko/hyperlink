import { React, useState, useEffect, useLayoutEffect } from 'react';
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
    console.log('filtering by tags');
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

  // retrieve collections
  const fetchCollections = async () => {
    const curCollections = await updateCollections();
    console.log(curCollections);
    setCollections(curCollections);
    setSelectedCollections(curCollections);
    setBusy(false);
  };
  useEffect(() => {
    if (isBusy) {
      fetchCollections();
    }
  }, [selectedCollections]);

  // refresh favourite icon
  useEffect(() => {
    handleTagsApply().then();
  }, [collections]);

  //after selectedTags changed, to apply tags filter
  // useEffect(() => {
  //   handleTagsApply().then();
  // }, [selectedTags]);
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
              wrapperClass="loader"
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
              wrapperClass="loader"
            />
          ) : (
            <CollectionBox
              collections={selectedCollections}
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
