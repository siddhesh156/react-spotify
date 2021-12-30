import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './SongList.css';
class SongList extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.viewType)
    if (
      nextProps.token !== '' &&
      !nextProps.fetchSongsError &&
      nextProps.fetchSongsPending &&
      nextProps.viewType === 'songs'
    ) {
      this.props.fetchSongs(nextProps.token);
    }
    else if(nextProps.viewType == "search"){
      this.props.fetchSearchSongs()
    }
  }

  componentDidMount() {
    this.props.fetchSongs(this.props.token);
  }

   random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',1)';
}
  
  componentDidUpdate(){
   document.body.style.background = `linear-gradient(to left, rgba(255,0,0,0), ${this.random_rgba()})`
  }

  msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  renderRecentSongs() {
    return this.props.songs.map((song, i) => {
      const buttonClass =
        song.track.id === this.props.songId && !this.props.songPaused
          ? 'fa-pause-circle-o'
          : 'fa-play-circle-o';

      return (
        <li
          className={
            song.track.id === this.props.songId
              ? 'active user-song-item'
              : 'user-song-item'
          }
          onClick={() => {
            song.track.id === this.props.songId &&
            this.props.songPlaying &&
            this.props.songPaused
              ? this.props.resumeSong()
              : this.props.songPlaying &&
                !this.props.songPaused &&
                song.track.id === this.props.songId
              ? this.props.pauseSong()
              : this.props.audioControl(song);
          }}
          key={i}
        >
          <div>
            <img className="song-image" src={song.track.album.images[0].url} />
          </div>

          <div className="song-title">
            <p>{song.track.name}</p>
            <div>{song.track.artists[0].name}</div>
          </div>

          <div className="song-length">
            <p>{this.msToMinutesAndSeconds(song.track.duration_ms || '400000')}</p>
          </div>
        </li>
      );
    });
  }

  renderSongs() {
    return this.props.songs.map((song, i) => {
      console.log("s ",song);
      const buttonClass =
        song.id === this.props.songId && !this.props.songPaused
          ? 'fa-pause-circle-o'
          : 'fa-play-circle-o';

      return (
        <li
          className={
            song.id === this.props.songId
              ? 'active user-song-item'
              : 'user-song-item'
          }
          onClick={() => {
            song.id === this.props.songId &&
            this.props.songPlaying &&
            this.props.songPaused
              ? this.props.resumeSong()
              : this.props.songPlaying &&
                !this.props.songPaused &&
                song.id === this.props.songId
              ? this.props.pauseSong()
              : this.props.audioControl(song);
          }}
          key={i}
        >
          {/* <div
            onClick={() => {
              song.id === this.props.songId &&
                this.props.songPlaying &&
                this.props.songPaused
                ? this.props.resumeSong()
                : this.props.songPlaying &&
                  !this.props.songPaused &&
                  song.id === this.props.songId
                  ? this.props.pauseSong()
                  : this.props.audioControl(song);
            }}
            className="play-song"
          >
            <i className={`fa ${buttonClass} play-btn`} aria-hidden="true" />
          </div> */}

          <div>
            <img className="song-image" src={song.album.images[0].url} />
          </div>

          <div className="song-title">
            <p>{song.name}</p>
            <div>{song.artists[0].name}</div>
          </div>

          <div className="song-length">
            <p>{this.msToMinutesAndSeconds(song.duration_ms || '400000')}</p>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="song-list">
        {/* {this.props.songs &&
          !this.props.fetchSongsPending &&
          !this.props.fetchPlaylistSongsPending &&
          this.renderSongs()} */}
          {this.props.songs && !this.props.songs[0].track && (this.props.viewType !== 'Recently Played' || this.props.viewType !== "Favourites")?
          this.renderSongs() : null}
        {this.props.songs && this.props.songs[0].track && this.props.viewType === 'Recently Played'
          ? this.renderRecentSongs()
          : null}
      </div>
    );
  }
}

SongList.propTypes = {
  viewType: PropTypes.string,
  token: PropTypes.string,
  songAddedId: PropTypes.string,
  songId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  songs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fetchSongsError: PropTypes.bool,
  fetchSongsPending: PropTypes.bool,
  fetchPlaylistSongsPending: PropTypes.bool,
  fetchSongs: PropTypes.func,
  audioControl: PropTypes.func,
  songPaused: PropTypes.bool,
  songPlaying: PropTypes.bool,
  resumeSong: PropTypes.func,
  pauseSong: PropTypes.func,
  addSongToLibrary: PropTypes.func,
  fetchSearchSongs : PropTypes.func
};

export default SongList;
