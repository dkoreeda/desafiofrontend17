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
    if(!videos) {
      <p>Loading ...</p>
    }
    return videos.map((video, index) => {
      return <Video key={index} content={video} runVideo={selectVideo}/>
    })
  }

  loadMoreVideos(e) {
      const loadingBtn = document.querySelector('.windows8');
      if(loadingBtn.style.display === "none") {
        loadingBtn.style.display = "block";
      } else {
        loadingBtn.style.display = "none";
      }
      setInterval(this.fetchPlaylist(), 5000);
  }

  fetchPlaylist() {
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
        const loadingBtn = document.querySelector('.windows8');
        if(loadingBtn.style.display === "none") {
          loadingBtn.style.display = "block";
        } else {
          loadingBtn.style.display = "none";
        }
        this.props.loadMoreVideos(res.data.items);
      })
      .catch((err) => { console.log(err) });
  }

  render() {
    return(
      <div id="videos">
        <div id="list">
          { this.renderVideos(this.props.videos, this.props.selectVideo) }
        </div>
        <div id="loading">
          <button onClick={(e) => this.loadMoreVideos(e)}>CARREGAR MAIS VIDEOS...</button>
          <div className="windows8" style={{display: "none"}}>
            <div className="wBall" id="wBall_1">
              <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_2">
              <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_3">
              <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_4">
              <div className="wInnerBall"></div>
            </div>
            <div className="wBall" id="wBall_5">
              <div className="wInnerBall"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideosList;
