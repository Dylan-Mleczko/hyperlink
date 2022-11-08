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
  const redirectToCollectionPage = () => {
    // console.log(collection._id);
    navigate('/collections', {
      state: {
        collection,
      },
    });
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
