import SongControls from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { increaseSongTime } from "../../actions/songActions";

const mapStateToProps = state => {
  console.log("song control ",state.songsReducer.songDetails);
  return {
    songName: state.songsReducer.songDetails
      ? state.songsReducer.songDetails.name || state.songsReducer.songDetails.track.name
      : "",
    artistName: state.songsReducer.songDetails && state.songsReducer.songDetails.artists
      ? state.songsReducer.songDetails.artists[0].name
      : "",
    songPlaying: state.songsReducer.songPlaying,
    timeElapsed: state.songsReducer.timeElapsed,
    songPaused: state.songsReducer.songPaused,
    songDetails: state.songsReducer.songDetails,
    songs: state.songsReducer.songs
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      increaseSongTime
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SongControls);
