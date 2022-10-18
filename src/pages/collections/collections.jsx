import { React, useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { useLocation } from 'react-router-dom';
import { Title } from '../../components/Title/Title';
import { CollectionItem } from '../../components/collectionItem/collectionItem';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import './styles.css';
import axios from 'axios';

const Collections = () => {
  const [items, setItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);

  const fetchItems = async () => {
    try {
      let response = await axios.get(`${baseDevelopmentURL}/item/all`, {
        withCredentials: true,
      });
      let json = await response.json();
      return { success: true, data: json };
    } catch (error) {
      return { success: false };
    }
  };

  const createItem = async (item) => {
    try {
      let response = await axios.post(
        `${baseDevelopmentURL}/item/new`,
        {
          name: 'a name',
          description: 'description',
          date: new Date().toDateString(),
          link: 'https://axios-http.com/docs/post_example',
        },
        {
          withCredentials: true,
        }
      );
      let json = await response.json();
      return { success: true, data: json };
    } catch (error) {
      return { success: false };
    }
  };

  const handleClick = () => {
    createItem();
  };

  useEffect(() => {
    (async () => {
      setItemsLoaded(false);
      let res = await fetchItems();
      if (res.success) {
        setItems(res.data.results[0]);
        setItemsLoaded(true);
      }
    })();
  }, []);

  return (
    <div className="body">
      <Header />
      <div className="fix-padding"></div>
      <div className="d-flex justify-content-center">
        <button onClick={handleClick}></button>
        <div className="table-responsive">
          <Title text="collection" />
          <table className="table table-light table-hover table-lg align-middle collections-table rounded">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {itemsLoaded &&
                data.map((item) => (
                  <tr>
                    <td>{item.name}</td>
                    <td>
                      {item.description}
                      <br />
                      {item.date}
                    </td>
                    <td>
                      <div class="w-25 h-25 bg-dark"></div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Collections;
