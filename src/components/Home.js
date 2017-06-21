import React, { Component } from 'react';
import Axios from 'axios';
import Nav from './Nav';
import Video from './Video';
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

  renderVideos(items) {
    if(!items) {
      return <p>Loading...</p>
    }
    return items.map((item, index) => {
      // console.log("mapping function", item);
      return <Video key={index} content={item} {...this.props}/>
    });
  }

  render() {
    // console.log("items: ", this.state.items);
    return (
      <div>
        <Nav/>
        <div className="main flex-columns">
          <VideoDestaque video={this.state.currentVideo} />
          <div id="videos-list">
            { this.renderVideos(this.state.videos) }
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
