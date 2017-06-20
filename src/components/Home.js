import React, { Component } from 'react';
import Axios from 'axios';
import Video from './Video';
import VideoDestaque from './VideoDestaque';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      destaque: ''
    }
  }
  // channel id: UCEWHPFNilsT0IfQfutVzsag

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
        items: res.data.items,
        destaque: res.data.items[0]
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
        <VideoDestaque video={this.state.destaque} />
        <div className="videos-list">
          { this.renderVideos(this.state.items) }
        </div>
      </div>
    );
  }
}

export default Home;
