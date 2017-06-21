import React, { Component } from 'react';
import Axios from 'axios';
import Nav from './Nav';
import VideosList from './VideosList';
import CurrentVideo from './CurrentVideo';
import '../css/home.scss';

class Home extends Component {
  constructor() {
      super();
      this.state = {
        videos: [],
        videoInicial: '',
        currentVideo: ''
      }
  }

  componentDidMount() {
      Axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
          part: 'snippet,contentDetails',
          maxResults: '4',
          playlistId: 'PLT0Smhj8chMV0u07ZU7Vc5NvtstNJpeuF',
          key: 'AIzaSyCmXWIHpnA-fIuLrqfzr9PaeonezFtnmm4'
        }
      })
      .then((res) => {
        // console.log(res);
        this.setState({
          videoInicial: res.data.items[0].snippet.resourceId.videoId,
          currentVideo: res.data.items[0]
        });
        this.fetchVideosIds(res.data.items);
      })
      .catch((err) => {console.log(err)})
  }

  fetchVideosIds(videos) {
      let videosIds = [];
      if(!videos) {
        return <p>Loading...</p>
      }
      videos.map((video, index) => {
        // console.log("mapping function", video);
        let id = video.snippet.resourceId.videoId;
        // console.log("mapping function - video id", id);
        videosIds.push(id);
        // console.log("video Ids", videosIds);
      });

      const jointIds = videosIds.join(',');
      // console.log(jointIds);

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
      })
      .catch((err) => { console.log(err) });
  }

  renderCurrentVideo(current, initial) {
    if(!current) {
      return <p>Loading...</p>
    }
    return <CurrentVideo video={current} initial={initial} />

  }

  selectVideo(video) {
      console.log("video was clicked");
      this.setState({
        currentVideo: video,
        videoInicial: ''
      });
  }

  render() {
    // console.log("items: ", this.state.items);
    console.log(this.state.currentVideo);
    let currentVideo = this.state.currentVideo;
    const initialVideo = this.state.videoInicial;

    return (
      <div>
        <Nav/>
        <div className="main flex-columns">
          {this.renderCurrentVideo(currentVideo, initialVideo)}
          <div id="videos-list">
            <VideosList videos={this.state.videos} selectVideo={this.selectVideo.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
