import React from 'react';

const Video = (props) => {
    // console.log("Video.js", props.runVideo);
    // <iframe style={{height: "128px", width: "170px"}}
    //   src={"http://www.youtube.com/embed/"+props.content.snippet.resourceId.videoId}>
    // </iframe>
    return (
      <div className="video" onClick={(e) => props.runVideo(props.content)}>
        <div className="content">
          <img src={props.content.snippet.thumbnails.default.url} alt="video thumbnail"/>
        </div>
        <div className="content">
          <h3>{props.content.snippet.title}</h3>
          <span>{props.content.statistics.viewCount}</span>
        </div>
      </div>
    );
}

export default Video;
