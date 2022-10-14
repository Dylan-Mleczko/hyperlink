import { React } from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Fade, LightSpeed } from 'react-reveal';

import '../../index.css';
import { Header } from '../../components/Header';
import test from '../../assets/test.png';
import './styles.css';

useEffect(() => {
  document.title = 'HyperLink';
}, []);

const Welcome = () => {
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
              <img src={test} alt="gallery-page" />
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
              <img src={test} alt="gallery-page" />
            </Fade>
          </div>
          <div className="gallery-container">
            <Fade left>
              <img src={test} alt="gallery-page" />
            </Fade>
            <LightSpeed right>
              <div>
                <h1 className="heading-title font-semi-bold">Share With Others</h1>
                <p className="welcomeText">
                  Publish your work to a vibrant community and see other people's collections
                </p>
              </div>
            </LightSpeed>
          </div>
          <div className="gallery-container">
            <LightSpeed left>
              <div>
                <h1 className="heading-title font-semi-bold">Share With Others</h1>
                <p className="welcomeText">
                  Publish your work to a vibrant community and see other people's collections
                </p>
              </div>
            </LightSpeed>
            <Fade right>
              <img src={test} alt="gallery-page" />
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
