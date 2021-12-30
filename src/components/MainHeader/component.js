import React from 'react';
import PropTypes from 'prop-types';
import './MainHeader.css';
import Header from '../Header';

const MainHeader = ({
  pauseSong,
  resumeSong,
  fetchCategories,
  fetchNewReleases,
  fetchFeatured,
  updateHeaderTitle,
  updateViewType,
  songPaused,
  headerTitle,
  viewType,
  playlists,
  token,
  artists,
}) => {
  return (
    <div className="section-title">
      <div>
        <h3 className="header-title">{headerTitle}</h3>
        <Header />
      </div>
    </div>
  );
};

MainHeader.propTypes = {
  pauseSong: PropTypes.func,
  resumeSong: PropTypes.func,
  fetchCategories: PropTypes.func,
  fetchNewReleases: PropTypes.func,
  fetchFeatured: PropTypes.func,
  updateHeaderTitle: PropTypes.func,
  updateViewType: PropTypes.func,
  songPaused: PropTypes.bool,
  headerTitle: PropTypes.string,
  viewType: PropTypes.string,
  playlists: PropTypes.array,
  playlistMenu: PropTypes.array,
  token: PropTypes.string,
  artists: PropTypes.array,
};

export default MainHeader;
