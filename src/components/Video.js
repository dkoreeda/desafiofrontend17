import React from 'react';
import views from '../css/img/views.png';

const Video = (props) => {

  let viewsCount = props.content.statistics.viewCount;
  let currentViews;
  // console.log(viewsCount);
  if(viewsCount > 999 && viewsCount <= 999999) {
    let totalViews = Math.round(viewsCount/1000);
    // console.log("arrendondado", viewsCount);
    currentViews = totalViews + 'k views';
  } else if(viewsCount > 999999) {
    let totalViews = Math.round(viewsCount/1000000);
    // console.log("arrendondado", viewsCount);
    currentViews = totalViews + 'm views';
  } else {
    currentViews = viewsCount + ' views';
  }

    return (
      <div className="video" onClick={(e) => props.runVideo(props.content)}>
        <div className="content img">
          <img src={props.content.snippet.thumbnails.default.url} alt="video thumbnail"/>
        </div>
        <div className="content">
          <div className="content-box">
            <div className="title">
              <h3>{props.content.snippet.title}</h3>
            </div>
            <div className="info">
              <img src={views} alt="icone"/><span>{currentViews}</span>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Video;
