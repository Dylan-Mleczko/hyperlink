import { React, useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { useLocation } from 'react-router-dom';
import { Title } from '../../components/Title/Title';
import { baseDevelopmentURL } from '../../utils/constants/index';
import { CollectionItem } from '../../components/collectionItem/collectionItem';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import './styles.css';
import axios from 'axios';
import { NewLink } from '../../components/newLink/NewLink';

const Collections = () => {
  const [items, setItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const location = useLocation();
  // console.log(collectionId);
  const collectionId = location?.state?.collectionId;
  console.log(collectionId);

  const fetchItems = async () => {
    try {
      await axios
        .get(`${baseDevelopmentURL}/link/all/:${collectionId}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response.data);
          console.log('it worked!!!');
        });
      // let json = await response.json();
      // return { success: true, data: json };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  };

  const createItem = async (item) => {
    try {
      let response = await axios.post(
        `${baseDevelopmentURL}/link/new`,
        {
          name: 'a name',
          description: 'description',
          date: new Date().toDateString(),
          link: 'https://axios-http.com/docs/post_example',
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        }
      );
      let json = await response.json();
      return { success: true, data: json };
    } catch (error) {
      return { success: false };
    }
  };

  const handleCreateLink = () => {
    axios.post(
      `${baseDevelopmentURL}/collection/new`,
      {
        formData: {
          name: values.name,
          description: values.description,
          tags: values.tags,
          image: values.image,
        },
        // formData,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      }
    ).then;
  };

  const handleClick = () => {
    createItem();
  };

  useEffect(() => {
    fetchItems();
    // (async () => {
    //   setItemsLoaded(false);
    //   let res = await fetchItems();
    //   if (res.success) {
    //     setItems(res.data.results[0]);
    //     setItemsLoaded(true);
    //   }
    // })();
  }, []);

  return (
    <div className="body">
      <Header />
      <NewLink collectionId={collectionId}></NewLink>
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
