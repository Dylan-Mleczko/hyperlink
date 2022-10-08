import './styles.css';
import { Tag } from '../../components/tag/Tag';

export const Collection = ({ collection, favouriteFunction }) => {
  return (
    <div>
      <button className="collection-box">
        <img className="collection-image" src="collection-background.jpg"></img>
        <div className="collection-bottom">
          <p>{collection.name}</p>
          <button className="favourite-button" onClick={() => favouriteFunction(collection)}>
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
