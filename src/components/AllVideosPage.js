import React from 'react';
import Axios from 'axios';
import Nav from './Nav';
import VideosList from './VideosList';

class AllVideosPage extends React.Component {

  constructor() {
    super();
    this.state = {
      playlistId: '',
      counter: 0,
      videos: [],
      currentVideo: ''
    }
  }

  componentDidMount() {
      Axios.get('https://www.googleapis.com/youtube/v3/playlists', {
          params: {
            part: 'snippet,contentDetails',
            channelId: 'UCEWHPFNilsT0IfQfutVzsag',
            maxResults: '20',
            key: 'AIzaSyCmXWIHpnA-fIuLrqfzr9PaeonezFtnmm4'
          }
      })
      .then((res) => {
        console.log("component did mount", res);
        this.selectPlaylist(res)})
      .catch((err) => {console.log(err)})
  }

  selectPlaylist(res) {
      this.fetchNewVideos(res.data.items[this.state.counter].id);
      this.setState({counter: this.state.counter+1});
  }

  fetchNewVideos(playlistId) {
      Axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
          part: 'snippet,contentDetails',
          maxResults: '12',
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
      this.apiCall(jointIds);
  }

  apiCall(jointIds) {
      Axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: jointIds,
          key: 'AIzaSyCmXWIHpnA-fIuLrqfzr9PaeonezFtnmm4'
        }
      })
      .then((res) => {
        // console.log("fetch videos", res);
        this.setState({videos: res.data.items});
        // this.renderVideos(res.data.items);

      })
      .catch((err) => { console.log(err) });
  }

  selectVideo(video) {
      console.log("video was clicked");
      this.setState({
        currentVideo: video
      });
  }

  loadVideos(items) {
    console.log("Home.js - loadVideos", items);
    this.setState({videos: this.state.videos.concat(items)});
  }

  dataSubmission(search) {
    // console.log("submit search", search);
      Axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          maxResults: '12',
          part: 'snippet',
          q: search,
          key: 'AIzaSyCmXWIHpnA-fIuLrqfzr9PaeonezFtnmm4'
        }
      })
      .then((res) => {
          console.log("fetch videos", res.data.items);
          let result = res.data.items;
          let resultIds = [];
          result.map((item, index) => {
            resultIds.push(item.id.videoId);
          })

          const jointIds = resultIds.join(',');

          this.apiCall(jointIds);
      })
      .catch((err) => { console.log(err) });
  }

  renderCurrentVideo(video) {
      if(!video) {
        <p>Loading...</p>
      } else {
        let current = document.querySelector('#current');
        if(current.style.display === "none"){
          current.style.display = "block";
        } else {
          current.style.display = "none";
        }
      }
  }

  render() {
    // console.log("All Videos Page", this.state.videos);
    return(
      <div>
        <Nav submit={this.dataSubmission.bind(this)}/>
        <div>
          <VideosList videos={this.state.videos} selectVideo={this.selectVideo.bind(this)} loadMoreVideos={this.loadVideos.bind(this)} number={'12'}/>
        </div>
        <div id="current" style={{display: "none", zIndex:"2"}}>
          {this.renderCurrentVideo(this.state.currentVideo)}
        </div>
      </div>
    );
  }
}

export default AllVideosPage;
