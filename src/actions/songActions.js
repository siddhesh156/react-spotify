import uniqBy from 'lodash/uniqBy';
import { setArtistIds } from './artistActions';
import { updateHeaderTitle } from "./uiActions";

export const fetchSongsPending = () => {
  return {
    type: 'FETCH_SONGS_PENDING'
  };
};

export const fetchSongsSuccess = (songs) => {
  return {
    type: 'FETCH_SONGS_SUCCESS',
    songs
  };
};

export const fetchSongsError = () => {
  return {
    type: 'FETCH_SONGS_ERROR'
  };
};

export const fetchSearchSongs = () => {
  return (dispatch,getState) => {
    let res = getState().songsReducer.songs
    dispatch(fetchSongsSuccess(res));
    updateHeaderTitle("For You")
  }
};

export const fetchSongs = (accessToken) => {
  return dispatch => {
    //https://api.spotify.com/v1/browse/new-releases
    
    const request = new Request(`https://api.spotify.com/v1/tracks?ids=7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchSongsPending());

    fetch(request).then(res => {
      if(res.statusText === "Unauthorized") {
        window.location.href = './';
      }
      return res.json();
    }).then(res => {
      // get all artist ids and remove duplicates
      let artistIds = uniqBy(res.items, (item) => {
        return item.track.artists[0].name;
      }).map(item => {
        return item.track.artists[0].id;
      }).join(',');

      //console.log("sa ",res.tracks);
      dispatch(setArtistIds(artistIds));

      // dispatch(fetchSongsSuccess(res.items));
      // dispatch(fetchSongsSuccess(res.albums.items));
      dispatch(fetchSongsSuccess(res.tracks));
    }).catch(err => {
      console.log(err);
      dispatch(fetchSongsError(err));
    });
  };
};

export const searchSongsPending = () => {
  return {
    type: 'SEARCH_SONGS_PENDING'
  };
};

export const searchSongsSuccess = (songs) => {
  return {
    type: 'SEARCH_SONGS_SUCCESS',
    songs
  };
};

export const searchSongsError = () => {
  return {
    type: 'SEARCH_SONGS_ERROR'
  };
};

export const searchSongs = (searchTerm, accessToken) => {
  return dispatch => {
    // const request = new Request(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
    //   headers: new Headers({
    //     'Authorization': 'Bearer ' + accessToken,
    //     'Accept': 'application/json'
    //   })
    // });

    const request = new Request(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track&limit=10&offset=5`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json'
      })
    });

    dispatch(searchSongsPending());

    fetch(request).then(res => {
      if(res.statusText === "Unauthorized") {
        window.location.href = './';
      }
      return res.json();
    }).then(res => {
      res.items = res.tracks.items.map(item => {
        return {
          track: item
        };
      });
      console.log(res.items);
      dispatch(searchSongsSuccess(res.items));
      dispatch(fetchSongsSuccess(res.items));
    }).catch(err => {
      dispatch(fetchSongsError(err));
    });
  };
};

export const fetchRecentlyPlayedPending = () => {
  return {
    type: 'FETCH_RECENTLY_PLAYED_PENDING'
  };
};

export const fetchRecentlyPlayedSuccess = (songs) => {
  return {
    type: 'FETCH_RECENTLY_PLAYED_SUCCESS',
    songs
  };
};

export const fetchRecentlyPlayedError = () => {
  return {
    type: 'FETCH_RECENTLY_PLAYED_ERROR'
  };
};

export const fetchRecentlyPlayed = (accessToken) => {
  return dispatch => {
    // const request = new Request(`https://api.spotify.com/v1/me/player/recently-played`, {
    //   headers: new Headers({
    //     'Authorization': 'Bearer ' + accessToken
    //   })
    // });

    const request = new Request(`https://api.spotify.com/v1/me/player/recently-played?limit=10&after=1484811043508`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchRecentlyPlayedPending());

    fetch(request).then(res => {
      return res.json();
    }).then(res => {
      //remove duplicates from recently played
      res.items = uniqBy(res.items, (item) => {
        return item.track.id;
      });
      dispatch(fetchRecentlyPlayedSuccess(res.items));
    }).catch(err => {
      dispatch(fetchRecentlyPlayedError(err));
    });
  };
};

export const playSong = (song) => {
  return {
    type: 'PLAY_SONG',
    song
  };
};

export const stopSong = () => {
  return {
    type: 'STOP_SONG'
  };
};

export const pauseSong = () => {
  return {
    type: 'PAUSE_SONG'
  };
};

export const resumeSong = () => {
  return {
    type: 'RESUME_SONG'
  };
};

export const increaseSongTime = (time) => {
  return {
    type: 'INCREASE_SONG_TIME',
    time
  };
};

export const updateViewType = (view) => {
  return {
    type: 'UPDATE_VIEW_TYPE',
    view
  };
};
