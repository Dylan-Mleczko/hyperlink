import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title/Title';
import { faPen } from '@fortawesome/free-solid-svg-icons';
// import 'font-awesome/css/font-awesome.min.css';
import './styles.css';

const Profile = () => {
  return (
    <div>
      <Header isLoggedIn={true} />
      <div class="body">
        <div className="content">
          <Title text={'My Profile'} />
          <div class="info-table">
            <div class="input-group mb-3">
              <span class="input-group-text">First name</span>
              <input
                type="text"
                aria-label="First name"
                class="form-control"
                placeholder="user first name"
              />
              <button class="btn btn-outline-secondary" type="button" id="edit-1">
                <FontAwesomeIcon icon={faPen} />
              </button>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Last name</span>
              <input
                type="text"
                aria-label="Last name"
                class="form-control"
                placeholder="user last name"
              />
              <button class="btn btn-outline-secondary" type="button" id="edit-2">
                <FontAwesomeIcon icon={faPen} />
              </button>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Password</span>
              <input type="password" aria-label="Password" class="form-control" />
              <button class="btn btn-outline-secondary" type="button" id="edit-3">
                <FontAwesomeIcon icon={faPen} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
