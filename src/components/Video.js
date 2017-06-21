import React from 'react';
import '../css/video.scss';

const Video = (props) => {
    // console.log("Video.js", this.props.content);
    return (
      <div className="video" onClick={(e) => props.runVideo(props.content)}>
        <div className="content">
          <iframe style={{height: "128px", width: "170px"}}
            src={"http://www.youtube.com/embed/"+props.content.snippet.resourceId.videoId}>
          </iframe>
        </div>
        <div className="content">
          <h3>{props.content.snippet.title}</h3>
          <p>{props.views}</p>
        </div>
      </div>
    );
}

export default Video;
