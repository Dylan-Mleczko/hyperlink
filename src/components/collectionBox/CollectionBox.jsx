import './styles.css';
import { Collection } from '../collection/Collection';

export const CollectionBox = ({ collections, favouriteCollection, handleEdit }) => {
  return (
    <div className="collections">
      {collections?.map((collection) => (
        <Collection
          key={collection._id}
          collection={collection}
          favouriteCollection={favouriteCollection}
          handleEdit={handleEdit}
        ></Collection>
      ))}
    </div>
  );
};
