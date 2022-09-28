import { React } from 'react';
import { Header } from '../../components/Header';
import { useLocation } from 'react-router-dom';
import { Title } from '../../components/Title/Title';

const Collections = () => {
  const location = useLocation();

  return (
    <div className="body">
      <Header />
      <Title text="Collection Name" />
      <div className="d-flex justify-content-center">
        <div className="table-responsive">
          <table className="table table-light table-hover table-lg align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <th>example</th>
                <td>example</td>
                <td>example</td>
              </tr>
              <tr>
                <th>example</th>
                <td>example</td>
                <td>example</td>
              </tr>
              <tr>
                <th>example</th>
                <td>example</td>
                <td>example</td>
              </tr>
              <tr>
                <th>example</th>
                <td>example</td>
                <td>example</td>
              </tr>
              <tr>
                <th>example</th>
                <td>example</td>
                <td>example</td>
              </tr>
              <tr>
                <th>example</th>
                <td>example</td>
                <td>example</td>
              </tr>
              <tr>
                <th>example</th>
                <td>example</td>
                <td>example</td>
              </tr>
              <tr>
                <th>example</th>
                <td>example</td>
                <td>example</td>
              </tr>
              <tr>
                <th>example</th>
                <td>example</td>
                <td>example</td>
              </tr>
              <tr>
                <th>example</th>
                <td>example</td>
                <td>example</td>
              </tr>
              <tr>
                <th>example</th>
                <td>example</td>
                <td>example</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Collections;
