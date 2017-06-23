import React from 'react';
import Axios from 'axios';
import Video from './Video';

class VideosList extends React.Component {
  constructor() {
    super();
    this.state = {
      playlistId: '',
      counter: 0
    }
  }

  renderVideos(videos, selectVideo) {
    // console.log("render videos list", videos);
    if(!videos) {
      <p>Loading ...</p>
    }
    return videos.map((video, index) => {
      // console.log("mapping func - video", video);
      // console.log("mapping func - select func", selectVideo);
      return <Video key={index} content={video} runVideo={selectVideo}/>
    })
  }

  loadMoreVideos(e) {
      Axios.get('https://www.googleapis.com/youtube/v3/playlists', {
          params: {
            part: 'snippet,contentDetails',
            channelId: 'UCEWHPFNilsT0IfQfutVzsag',
            maxResults: '20',
            key: 'AIzaSyCmXWIHpnA-fIuLrqfzr9PaeonezFtnmm4'
          }
      })
      .then((res) => {this.selectPlaylist(res)})
      .catch((err) => {console.log(err)})
  }

  selectPlaylist(res) {
      this.fetchNewVideos(res.data.items[this.state.counter].id);
      this.setState({counter: this.state.counter+1});
  }

  fetchNewVideos(playlistId) {
    let number = this.props.number;
      Axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
          part: 'snippet,contentDetails',
          maxResults: number,
          playlistId: playlistId,
          key: 'AIzaSyCmXWIHpnA-fIuLrqfzr9PaeonezFtnmm4'
        }
      })
      .then((res) => {
        // console.log(res);
        this.fetchNewVideosIds(res.data.items);
      })
      .catch((err) => {console.log(err)})
  }

  fetchNewVideosIds(videos) {
      let videosIds = [];
      if(!videos) {
        return <p>Loading...</p>
      }
      videos.map((video, index) => {
        let id = video.snippet.resourceId.videoId;
        videosIds.push(id);
      });

      const jointIds = videosIds.join(',');

      Axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: jointIds,
          key: 'AIzaSyCmXWIHpnA-fIuLrqfzr9PaeonezFtnmm4'
        }
      })
      .then((res) => {
        // console.log("fetch videos", res);
        this.props.loadMoreVideos(res.data.items);
      })
      .catch((err) => { console.log(err) });
  }

  render() {
    console.log("VideoList playlist id", this.state.playlistId);
    console.log("counter", this.state.counter);
    return(
      <div>
        { this.renderVideos(this.props.videos, this.props.selectVideo) }
        <button onClick={(e) => this.loadMoreVideos(e)}>CARREGAR MAIS VIDEOS...</button>
      </div>
    )
  }
}

export default VideosList;
