import { React } from 'react';
import { Header } from '../../components/Header';
import { useLocation } from 'react-router-dom';
import { SelectedTags } from '../../components/selectedTags/SelectedTags';
import axios from 'axios';
import { baseDevelopmentURL } from '../../utils/constants';

const Gallery = () => {
  const location = useLocation();

  var tags = [{ name: 'test' }, { name: 'example' }];

  // var tags = (async () => {
  //   const res = await axios.get(`${baseDevelopmentURL}/tags`, {
  //     data: {
  //       userID: location?.state?.user?.id,
  //     },
  //   });
  //   return res.data.tags;
  // })();

  return (
    <div>
      <Header
        isLoggedIn={true}
        userName={location?.state?.user?.name?.first}
        token={location?.state?.user?.token}
      />
      <SelectedTags tagNames={tags}></SelectedTags>
    </div>
  );
};

export default Gallery;
