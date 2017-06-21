import React from 'react';
import Axios from 'axios';
import Video from './Video';

class VideosList extends React.Component {
  constructor() {
    super();
    this.state = {
      playlistId: ''
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
      .then((res) => {
        console.log(res);
        let playlist = this.state.playlistId;
        let i = 0;
        if(playlist === res.data.items[i].id) {
          i += 1;
          this.setState({playlistId: res.data.items[i].id})
        }
        this.fetchNewVideos(res.data.items[i].id);
      })
      .catch((err) => {console.log(err)})
  }

  fetchNewVideos(playlistId) {
      Axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
          part: 'snippet,contentDetails',
          maxResults: '4',
          playlistId: playlistId,
          key: 'AIzaSyCmXWIHpnA-fIuLrqfzr9PaeonezFtnmm4'
        }
      })
      .then((res) => {
        console.log(res);
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
        console.log("fetch videos", res);

        ------------->>>>>>>>>>>> append data!!!!!!!!!!


        this.renderVideos(res.data.items, this.props.selectVideo);
      })
      .catch((err) => { console.log(err) });
  }

  render() {
    return(
      <div>
        { this.renderVideos(this.props.videos, this.props.selectVideo) }
        <button onClick={(e) => this.loadMoreVideos(e)}>CARREGAR MAIS VIDEOS...</button>
      </div>
    )
  }
}

export default VideosList;
