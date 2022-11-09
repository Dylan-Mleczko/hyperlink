import './styles.css';
import { baseDevelopmentURL } from '../../utils/constants';

export const Title = ({ text, isCollectionPage, collection }) => {
  return (
    <div>
      {isCollectionPage ? (
        <div className="collection-title-box">
          <img
            className="titleImage"
            src={
              collection.image
                ? `${baseDevelopmentURL}/collection/image/${collection._id}`
                : 'no-image.jpg'
            }
          ></img>
          <div className="textBox">
            <h1 className="Name">{text}</h1>
            <h5>Description:</h5>
            <p className="descriptionText">{collection.description}</p>
          </div>
        </div>
      ) : (
        <div className="title-box">
          <h1 className="title">{text}</h1>
        </div>
      )}
    </div>
  );
};
