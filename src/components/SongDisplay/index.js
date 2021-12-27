import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  fetchCategories,
  fetchNewReleases,
  fetchFeatured
} from "../../actions/browseActions";
import { updateHeaderTitle } from "../../actions/uiActions";
import { updateViewType } from "../../actions/songActions";
import SongDisplay from "./component";

const mapStateToProps = state => {
  return {
    songPaused: state.songsReducer.songPaused,
    headerTitle: state.uiReducer.title,
    viewType: state.songsReducer.viewType,
    playlists: state.playlistReducer.playlists,
    artists: state.artistsReducer.artistList
      ? state.artistsReducer.artistList.artists
      : [],
    token: state.tokenReducer.token
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCategories,
      fetchNewReleases,
      updateHeaderTitle,
      updateViewType,
      fetchFeatured
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SongDisplay);
