import React from 'react';

const CurrentVideo = (props) => {
  // console.log("current video", props);
  return(
      <div>
        <iframe style={{height: "313px", width: "560px"}} src={"http://www.youtube.com/embed/"+props.video}></iframe>
        <div className="info-box">
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
      </div>
  );
}

export default CurrentVideo;
