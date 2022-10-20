import './styles.css';
import { Tag } from '../../components/tag/Tag';
import axios from 'axios';
import { baseDevelopmentURL } from '../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export const Collection = ({ collection, favouriteCollection }) => {
  const navigate = useNavigate();
  const redirectToCollectionPage = () => {
    // console.log(collection._id);
    navigate('/collections', {
      state: {
        collectionId: collection._id,
      },
    });
  };
  const [isError, setIsError] = useState(false);
  return (
    <div onClick={redirectToCollectionPage}>
      <div className="collection-box">
        <div
          className="collection-image"
          style={{
            backgroundColor: isError ? '' : '#198754',
          }}
        >
          <img
            loading="lazy"
            src={`${baseDevelopmentURL}/collection/image/${collection._id}`}
            alt="image broken, please upload new image"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              setIsError(true);
            }}
            placeholder="collection-background.jpg"
          />
        </div>
        <div className="collection-bottom">
          <p>{collection.name}</p>
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
