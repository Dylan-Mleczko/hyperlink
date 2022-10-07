import './styles.css';
import { Tag } from '../../components/tag/Tag';

export const Collection = ({ collection }) => {
  return (
    <div>
      <button className="collection-box">
        <img className="collection-image" src="collection-background.jpg"></img>
        <div className="collection-bottom">
          <p>{collection.name}</p>
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
