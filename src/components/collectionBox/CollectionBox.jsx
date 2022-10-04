import './styles.css';
import { Collection } from '../collection/Collection';

export const CollectionBox = ({ collections }) => {
  return (
    <div className="collections">
      {collections.map((collection) => (
        <Collection key={collection.name} collection={collection}></Collection>
      ))}
    </div>
  );
};
