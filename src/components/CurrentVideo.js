import React from 'react';

const CurrentVideo = (props) => {

  let videoId = props.initial;
  if(!props.initial) {
    videoId = props.video.id;
  }

  return(
      <div>
        <iframe style={{height: "313px", width: "560px"}} src={"http://www.youtube.com/embed/"+videoId}></iframe>
        <div className="info-box">
          <h3>{props.video.snippet.title}</h3>
          <span>{props.video.statistics.viewCount}</span>
          <span>{props.video.snippet.publishedAt}</span>
          <p>{props.video.snippet.description}</p>
        </div>
      </div>
  );
}

export default CurrentVideo;
