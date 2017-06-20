import React from 'react';
import Axios from 'axios';

class Video extends React.Component {
  constructor() {
    super();
  }

  componentDidMount(this.props.content.snippet.resourceId.videoId) {
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
      <div className="video">
        <iframe style={{height: "90px", width: "120px"}}
          src={"http://www.youtube.com/embed/"+this.props.content.snippet.resourceId.videoId}>
        </iframe>
        <h3>{this.props.content.snippet.title}</h3>
        <p>{this.videoViews(this.props.content.snippet.resourceId.videoId)}</p>
      </div>
    );
  }
}

export default Video;
