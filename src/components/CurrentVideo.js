import React from 'react';

const CurrentVideo = (props) => {

  // console.log("current video", props);
  // let videoId = props.video.id;
  // if(!videoId){
  //   videoId = props.video.snippet.resourceId.videoId;
  // }
  // console.log("current video id", videoId);
  let videoId = props.initial;
  if(!props.initial) {
    videoId = props.video.id;
  }

  return(
      <div>
        <iframe style={{height: "313px", width: "560px"}} src={"http://www.youtube.com/embed/"+videoId}></iframe>
        <div className="info-box">
          <h3>{props.video.snippet.title}</h3>
          <p>{props.video.snippet.description}</p>
        </div>
      </div>
  );
}

export default CurrentVideo;
