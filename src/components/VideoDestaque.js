import React from 'react';
import Axios from 'axios';

class VideoDestaque extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     video: '',
  //     title: '',
  //     description: ''
  //   }
  // }

  // componentDidMount() {
  //   Axios.get('https://www.googleapis.com/youtube/v3/videos', {
  //     params: {
  //       part: 'snippet,contentDetails, statistics',
  //       id: '5d4sCg1RZHQ',
  //       key: 'AIzaSyA-_-lElXcltZIBGaGiIqHiiYZIOO6bf1A'
  //     }
  //   })
  //   .then((res) => {
  //     console.log("video title", res.data.items[0].snippet.title);
  //     this.setState({
  //       video: res.data.items[0].id,
  //       title: res.data.items[0].snippet.title,
  //       description: res.data.items[0].snippet.description
  //     })
  //   })
  //   .catch((err) => {console.log(err)})
  // }

  // renderVideoDestaque(video, title, description) {
  //   if(!video) {
  //     <p>Loading...</p>
  //   }
  //   return
  //     <div id="video-destaque">
  //       <iframe style={{height: "313px", width: "560px"}} src={"http://www.youtube.com/embed/"+video}></iframe>
  //       <h3>{title}</h3>
  //       <p>{description}</p>
  //     </div>
  // }

      // <div className="video-content">
      //   {this.renderVideoDestaque(this.state.video, this.state.title, this.state.description)}
      // </div>

  render() {
    console.log("video destaque", this.props.video);
    return(
     <div id="video-destaque">

      </div>

    )
  }
}

export default VideoDestaque;
