import { React, useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { Title } from '../../components/Title/Title';
import { baseDevelopmentURL } from '../../utils/constants/index';
import { CollectionItem } from '../../components/collectionItem/collectionItem';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { toast } from 'react-toastify';
import './styles.css';
import axios from 'axios';
import { NewLink } from '../../components/newLink/NewLink';
import { ThreeDots } from 'react-loader-spinner';
import { EditBox } from '../../components/editBox/EditBox';

const Collections = () => {
  // const [items, setItems] = useState([]);
  const [links, setLinks] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [displayLink, setDisplayLink] = useState({});
  const [isNewLink, setIsNewLink] = useState(false);

  // const [itemsLoaded, setItemsLoaded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(collectionId);
  const collection = location?.state?.collection;
  const collectionId = collection._id;
  // console.log(collection);

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
          // setLinks(response.data.data);
          links = response.data.data.links;
          console.log(links);
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

  const handleCancelCreate = () => {
    setIsNewLink(false);
  };

  const handleDeleteLink = () => {
    axios
      .delete(`${baseDevelopmentURL}/link/${displayLink._id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('successfully deleted link!!!');
        setDisplayLink({});
        toast.success('Link Deleted!', {
          position: 'top-center',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: 'delete',
        });
        handleAfterUpdate();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data) {
          toast.error(err.response.data.message, {
            position: 'top-center',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'delete',
          });
        } else {
          toast.error(err.message, {
            position: 'top-center',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 'delete',
          });
        }
        const errCode = err.response.status;
        if (errCode === 401) {
          localStorage.clear();
          navigate('/');
        }
      });
  };

  const handleAfterCreate = async () => {
    const links = await fetchLinks();
    setLinks(links);
    setIsNewLink(false);
  };

  const handleAfterUpdate = async () => {
    const links = await fetchLinks();
    setLinks(links);
  };

  const showDetail = (linkItem) => {
    // alert(JSON.stringify(linkItem));
    setDisplayLink(linkItem);
    document.getElementById('displayButton').click();
    // displayButton
  };

  return (
    <div className="body">
      <Header />

      <div className="fix-padding"></div>
      {/* <div className="d-flex justify-content-center"> */}
      <div className="content">
        <Title text={collection.name} />
        <div className="new-link-button-container">
          <button onClick={newLinkOnclick} className="new-link-button">
            + Add
          </button>
        </div>
        {isNewLink ? (
          <NewLink
            collectionId={collectionId}
            onCancel={handleCancelCreate}
            onSuccess={handleAfterCreate}
          ></NewLink>
        ) : null}
        <div className="table-responsive">
          <table className="table table-light table-hover table-lg align-middle collections-table rounded">
            <thead>
              <tr>
                <th width="30%">Name</th>
                <th width="40%">Description</th>
                <th>Creation Date</th>
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
                  <tr
                    key={item._id}
                    onClick={() => {
                      showDetail(item);
                    }}
                  >
                    <td>
                      <a href={item.uri} target="_blank" title={item.uri}>
                        {item.name}
                      </a>
                    </td>
                    <td>
                      <div className="description-block">{item.description}</div>
                    </td>
                    <td>
                      <div class="w-125 h-25">{new Date(item.created_at).toDateString()}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <EditBox
          title={displayLink.name}
          data={displayLink}
          onUpdate={handleAfterUpdate}
          onDelete={handleDeleteLink}
          isLink={true}
        ></EditBox>
      </div>
    </div>
  );
};

export default Collections;
