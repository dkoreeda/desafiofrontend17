import React from 'react';
import Axios from 'axios';
import Video from './Video';

class VideosList extends React.Component {

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

  render() {
    return(
      <div>
        { this.renderVideos(this.props.videos, this.props.selectVideo) }
      </div>
    )
  }
}

export default VideosList;
