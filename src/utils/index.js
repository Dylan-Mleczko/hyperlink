import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseDevelopmentURL } from './constants/index';

export const logoutUser = async ({ token }) => {
  const navigate = useNavigate();
  const resp = await axios.post(`${baseDevelopmentURL}/logout`, {
    data: {
      token: token,
    },
  });

  console.log(resp);

  if (resp.data.ok) {
    navigate('/');
  }
};
