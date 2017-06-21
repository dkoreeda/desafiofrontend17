import React from 'react';
import Axios from 'axios';
import CurrentVideo from './CurrentVideo';

class VideoDestaque extends React.Component {
  constructor() {
    super();
    this.state = {
      video: '',
      title: '',
      description: ''
    }
  }

  componentDidMount() {
    Axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails, statistics',
        id: '5d4sCg1RZHQ',
        key: 'AIzaSyA-_-lElXcltZIBGaGiIqHiiYZIOO6bf1A'
      }
    })
    .then((res) => {
      // console.log("video title", res.data.items[0].snippet.title);
      this.setState({
        video: res.data.items[0].id,
        title: res.data.items[0].snippet.title,
        description: res.data.items[0].snippet.description
      })
    })
    .catch((err) => {console.log(err)})
  }

  renderVideoDestaque(video, title, description) {
    if(!video) {
      <p>Loading...</p>
    }
    return <CurrentVideo video={video} title={title} description={description}/>
  }

  render() {
    console.log("video destaque", this.state.video);

    return(
     <div id="video-destaque">
        {this.renderVideoDestaque(this.state.video, this.state.title, this.state.description)}
      </div>

    )
  }
}

export default VideoDestaque;
