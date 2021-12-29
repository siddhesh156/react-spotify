import SongControls from "./component";
import { connect } from "react-redux";

const mapStateToProps = state => {
  // return {
  //   albumImage: state.songsReducer.songDetails
  //     ? state.songsReducer.songDetails.album.images[0].url
  //     : ""
  // };
  return ""
};

export default connect(mapStateToProps)(SongControls);
