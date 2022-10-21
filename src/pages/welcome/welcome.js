import { React } from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Fade, LightSpeed } from 'react-reveal';

import '../../index.css';
import { Header } from '../../components/Header';
import collection from '../../assets/collection.png';
import website from '../../assets/website.png';
import gallery from '../../assets/gallery.png';
import table from '../../assets/table.png';

import './styles.css';

const Welcome = () => {
  useEffect(() => {
    document.title = 'HyperLink';
  }, []);

  return (
    <div className="body">
      <div className="content">
        <Header />
        <div>
          <div className="titleContainer">
            <h1 className="welcomeTitle">Welcome to HyperLink!</h1>
            <p className="welcomeText">Saving and sharing your favourite websites</p>
          </div>
          <div className="gallery-container">
            <Fade left>
              <img src={website} className="welcome-image" alt="gallery-page" />
            </Fade>
            <LightSpeed right>
              <div>
                <h1 className="heading-title font-semi-bold">Add Websites</h1>
                <p className="welcomeText">
                  Put websites into the collection with your own helpful information
                </p>
              </div>
            </LightSpeed>
          </div>
          <div className="gallery-container">
            <LightSpeed left>
              <div>
                <h1 className="heading-title font-semi-bold">Create Collections</h1>
                <p className="welcomeText">Make a new collection to store related websites</p>
              </div>
            </LightSpeed>
            <Fade right>
              <img src={collection} className="welcome-image" alt="collection-page" />
            </Fade>
          </div>
          <div className="gallery-container">
            <Fade left>
              <img src={gallery} className="welcome-image" alt="gallery-page" />
            </Fade>
            <LightSpeed right>
              <div>
                <h1 className="heading-title font-semi-bold">Organise your collections</h1>
                <p className="welcomeText">
                  You can organise your collections and favourite them as well as filter for easy
                  access.
                </p>
              </div>
            </LightSpeed>
          </div>
          <div className="gallery-container">
            <LightSpeed left>
              <div>
                <h1 className="heading-title font-semi-bold">View your websites</h1>
                <p className="welcomeText">
                  All your websites are arrnaged in a tabular manner for easy access
                </p>
              </div>
            </LightSpeed>
            <Fade right>
              <img src={table} style={{ width: '42%' }} alt="gallery-page" />
            </Fade>
          </div>
          <div className="footer-box">
            <p className="footer-text">© **IT Happens Pty Ltd 2022, all rights reserved.</p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p className="footer-text">Dylan |</p>
              <p className="footer-text">Kushal |</p>
              <p className="footer-text">Lexi |</p>
              <p className="footer-text">Thomas |</p>
              <p className="footer-text">Kelsey </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
