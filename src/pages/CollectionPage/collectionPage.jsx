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
import { ThreeDots } from 'react-loader-spinner';

const Collections = () => {
  // const [items, setItems] = useState([]);
  const [links, setLinks] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [isNewLink, setIsNewLink] = useState(false);

  // const
  // const [itemsLoaded, setItemsLoaded] = useState(false);
  const location = useLocation();
  // console.log(collectionId);
  const collectionId = location?.state?.collectionId;
  console.log(collectionId);

  const fetchLinks = async () => {
    var links = null;
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
          // console.log();
          // setLinks(response.data.data);
          links = response.data.data.links;
          console.log(links);
          console.log('it worked!!!');
        });
      // let json = await response.json();
      // return { success: true, data: response.data.data };
    } catch (error) {
      console.log(error);
      // return { success: false };ß
    }
    return links;
  };

  useEffect(() => {
    const initLinks = async () => {
      const links = await fetchLinks();
      setLinks(links);
      setBusy(false);
    };
    if (isBusy) {
      initLinks();
    }
  }, []);

  const newLinkOnclick = () => {
    setIsNewLink(true);
  };

  return (
    <div className="body">
      <Header />

      <div className="fix-padding"></div>
      {/* <div className="d-flex justify-content-center"> */}
      <div className="content">
        <Title text="collection" />
        <div className="collection-body">
          <div className="new-link-button-container">
            <button onClick={newLinkOnclick} className="new-link-button">
              + NewLink
            </button>
            {isNewLink ? <NewLink collectionId={collectionId}></NewLink> : null}
          </div>
          <div className="table-responsive">
            <table className="table table-light table-hover table-lg align-middle collections-table rounded">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Preview</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {isBusy ? (
                  <ThreeDots
                    height="100"
                    width="100"
                    radius="9"
                    color="green"
                    ariaLabel="three-dots-loading"
                    wrapperStyle
                    wrapperClass="loader"
                  />
                ) : (
                  links?.map((item) => (
                    <tr>
                      <td>{item.name}</td>
                      <td>
                        {item.description}
                        <br />
                        {new Date(item.created_at).toDateString()}
                      </td>
                      <td>
                        <div class="w-25 h-25 bg-dark"></div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Collections;
