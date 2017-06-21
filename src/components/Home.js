import React, { Component } from 'react';
import Axios from 'axios';
import Nav from './Nav';
import VideosList from './VideosList';
import VideoDestaque from './VideoDestaque';
import '../css/home.scss';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      videos: [],
      currentVideo: ''
    }
  }

  componentDidMount() {
    Axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        part: 'snippet,contentDetails',
        maxResults: '4',
        playlistId: 'PLT0Smhj8chMV0u07ZU7Vc5NvtstNJpeuF',
        key: 'AIzaSyA-_-lElXcltZIBGaGiIqHiiYZIOO6bf1A'
      }
    })
    .then((res) => {
      // console.log(res);
      this.setState({
        videos: res.data.items,
        currentVideo: res.data.items[0]
      })
    })
    .catch((err) => {console.log(err)})
  }

  selectVideo(video) {
    console.log("video was clicked");
    this.setState({currentVideo: video});
  }

  render() {
    // console.log("items: ", this.state.items);
    return (
      <div>
        <Nav/>
        <div className="main flex-columns">
          <VideoDestaque video={this.state.currentVideo} />
          <div id="videos-list">
            <VideosList videos={this.state.videos} selectVideo={this.selectVideo.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
