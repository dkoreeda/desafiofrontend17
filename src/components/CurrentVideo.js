import React from 'react';
import relogio from '../css/img/relogio.png';
import views from '../css/img/views.png';
// import currentvideo from '../css/currentvideo.css';

const CurrentVideo = (props) => {

  let videoId = props.initial;
  if(!props.initial) {
    videoId = props.video.id;
  }

  let viewsCount = props.video.statistics.viewCount;
  let currentViews;
  console.log(viewsCount);
  if(viewsCount > 999 && viewsCount <= 999999) {
    let totalViews = Math.round(viewsCount/1000);
    console.log("arrendondado", viewsCount);
    currentViews = totalViews + 'k views';
  } else if(viewsCount > 999999) {
    let totalViews = Math.round(viewsCount/1000000);
    console.log("arrendondado", viewsCount);
    currentViews = totalViews + 'm views';
  } else {
    currentViews = viewsCount + ' views';
  }


  const months = [
    {
      'de':'01',
      'para': ' de janeiro de '
    },
    {
      'de': '02',
      'para': ' de fevereiro de '
    },
    {
      'de': '03',
      'para': ' de março de '
    },
    {
      'de': '04',
      'para': ' de abril de '
    },
    {
      'de': '05',
      'para': ' de maio de '
    },
    {
      'de': '06',
      'para' : ' de junho de '
    },
    {
      'de': '07',
      'para': ' de julho de '
    },
    {
      'de': '08',
      'para': ' de agosto de '
    },
    {
      'de': '09',
      'para': ' de setembro de '
    },
    {
      'de': '10',
      'para': ' de outubro de '
    },
    {
      'de': '11',
      'para': ' de novembro de '
    },
    {
      'de': '12',
      'para': ' de dezembro de '
    }
  ];

  // console.log(months);

  let published = props.video.snippet.publishedAt;
  // console.log(published);
  let splitDate = published.split('-');
  // console.log(splitDate);

  let publishedYear = splitDate[0];
  let publishedMonth = splitDate[1];
  let date = splitDate[2];
  let grabDate = date.split('T');
  let publishedDate = grabDate[0];

  // console.log(splitDate[1]);

  months.forEach((month, index) => {
    if(month.de === publishedMonth) {
      publishedMonth = month.para;
    }
  });

  let currentDate = publishedDate+publishedMonth+publishedYear;
  // console.log(currentDate);

  let desc = props.video.snippet.description;
  let splitDesc = desc.split('Elenco');
  let currentDescription = splitDesc[0];

  return(
      <div id="currentvideo">
        <iframe  src={"http://www.youtube.com/embed/"+videoId}></iframe>
        <div className="info-box">
          <div id="headline">
            <div id="current-title">
              <h3>{props.video.snippet.title}</h3>
            </div>
            <div id="current-info">
              <div className="stats">
                <div className="views">
                  <img src={views} alt="icone"/>
                  <span id="published-views">{currentViews}</span>
                </div>
              </div>
              <div className="published">
                <div className="views">
                  <img src={relogio} alt="icone"/>
                  <span id="published-date">{currentDate}</span>
                </div>
              </div>
            </div>
          </div>
          <div id="current-description">
            <p>{currentDescription}</p>
          </div>
        </div>
      </div>
  );
}

export default CurrentVideo;
