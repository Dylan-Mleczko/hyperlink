import './styles.css';
import { Collection } from '../collection/Collection';

export const CollectionBox = ({ collections, favouriteFunction }) => {
  return (
    <div className="collections">
      {collections.map((collection) => (
        <Collection
          key={collection.name}
          collection={collection}
          favouriteFunction={favouriteFunction}
        ></Collection>
      ))}
    </div>
  );
};
