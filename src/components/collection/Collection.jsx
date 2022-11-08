import './styles.css';
import { Tag } from '../../components/tag/Tag';
import axios from 'axios';
import { baseDevelopmentURL } from '../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export const Collection = ({ collection, handleEdit, favouriteCollection }) => {
  const navigate = useNavigate();

  const redirectToCollectionPage = async () => {
    if (await updateClickCountCollection()) {
      navigate('/collections', {
        state: {
          collection,
        },
      });
    }
  };

  const updateClickCountCollection = async () => {
    axios
      .put(
        `${baseDevelopmentURL}/collection/${collection._id}`,
        { collectionDetails: { click_count: parseInt(collection.click_count) + 1 } },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log('updating click_count to:', response.data.data.collection.click_count);
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    return true;
  };

  const [isError, setIsError] = useState(false);

  return (
    <div>
      <div className="collection-box">
        <div
          className="collection-image"
          style={{
            backgroundColor: '#198754',
          }}
        >
          <img
            loading="lazy"
            onClick={redirectToCollectionPage}
            src={
              collection.image
                ? `${baseDevelopmentURL}/collection/image/${collection._id}`
                : 'no-image.jpg'
            }
            alt="image broken, please upload new image"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              setIsError(true);
            }}
            placeholder="collection-background.jpg"
          />
          <button
            className="edit-icon"
            onClick={() => {
              console.log('edit clicked');
              handleEdit(collection);
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <div className="collection-bottom">
          <div className="collection-title" title={collection.name}>
            {collection.name}
          </div>
          <button
            className="favourite-button"
            onClick={() => favouriteCollection(collection)}
            title="favourite"
          >
            <img
              src={collection.favourite ? 'full-star.png' : 'empty-star.png'}
              className="favourite-image"
              alt="favourite"
            ></img>
          </button>
          <div className="tags-container">
            {collection?.tags?.map((tag) => (
              <Tag key={tag.name} tag={tag.name} clickable={false}></Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
