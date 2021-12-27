import React from 'react';
import PropTypes from 'prop-types';
import './ArtWork.css';

const ArtWork = (albumArtwork) => (
  <div className='album-artwork-container'>
    <img alt="artwork" className='album-artwork'
    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" //src={albumArtwork.albumImage}
     />
  </div>
);


ArtWork.propTypes = {
  albumArtwork: PropTypes.string
};

export default ArtWork;
