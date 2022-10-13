import './styles.css';
import { Tag } from '../../components/tag/Tag';
import axios from 'axios';
import { baseDevelopmentURL } from '../../utils/constants';

export const Collection = ({ collection, favouriteCollection }) => {
  return (
    <div>
      <button className="collection-box">
        <img className="collection-image" src="collection-background.jpg"></img>
        <div className="collection-bottom">
          <p>{collection.name}</p>
          <button className="favourite-button" onClick={() => favouriteCollection(collection)}>
            <img
              src={collection.favourite ? 'full-star.png' : 'empty-star.png'}
              className="favourite-image"
            ></img>
          </button>
          <div className="tags-container">
            {collection.tags.map((tag) => (
              <Tag key={tag.name} tag={tag.name} clickable={false}></Tag>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
};
