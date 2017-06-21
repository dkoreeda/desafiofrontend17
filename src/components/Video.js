import React from 'react';
import Axios from 'axios';
import '../css/video.scss';

class Video extends React.Component {
  constructor() {
    super();
    this.state = {
      views: ''
    }
  }

  componentDidMount() {
    let id = this.props.content.snippet.resourceId.videoId;
    Axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: id,
        key: 'AIzaSyA-_-lElXcltZIBGaGiIqHiiYZIOO6bf1A'
      }
    })
    .then((res) => {
      console.log("Video Views: ", res);
      this.setState({views: res.data.items[0].statistics.viewCount})
    })
    .catch((err) => {console.log(err)})
  }

  render() {
    // console.log("Video.js", this.props.content);
    return (
      <div className="video" onClick={(e) => this.props.runVideo(this.props.video)}>
        <div className="content">
          <iframe style={{height: "128px", width: "170px"}}
            src={"http://www.youtube.com/embed/"+this.props.content.snippet.resourceId.videoId}>
          </iframe>
        </div>
        <div className="content">
          <h3>{this.props.content.snippet.title}</h3>
          <p>{this.state.views}</p>
        </div>
      </div>
    );
  }
}

export default Video;
