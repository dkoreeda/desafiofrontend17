import React from 'react';

const CurrentVideo = (props) => {

  let videoId = props.initial;
  if(!props.initial) {
    videoId = props.video.id;
  }

  return(
      <div>
        <iframe  src={"http://www.youtube.com/embed/"+videoId}></iframe>
        <div className="info-box">
          <div id="headline">
            <div>
              <h3>{props.video.snippet.title}</h3>
            </div>
            <div>
              <span>{props.video.statistics.viewCount}</span>
              <span>{props.video.snippet.publishedAt}</span>
            </div>
          </div>
          <p>{props.video.snippet.description}</p>
        </div>
      </div>
  );
}

export default CurrentVideo;
