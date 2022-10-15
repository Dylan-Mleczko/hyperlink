import { React } from 'react';
import { Header } from '../../components/Header';
import { useLocation } from 'react-router-dom';
import { Title } from '../../components/Title/Title';
import { CollectionItem } from '../../components/collectionItem/collectionItem';

const Collections = () => {
  const location = useLocation();

  return (
    <div className="body">
      <Header />
      <div className="d-flex justify-content-center">
        <div className="table-responsive">
          <Title text="collection" />
          <table className="table table-light table-hover table-lg align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <CollectionItem></CollectionItem>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Collections;
