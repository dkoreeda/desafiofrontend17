import React from 'react';
import Axios from 'axios';
import Video from './Video';

class VideosList extends React.Component {

  constructor() {
    super();
    this.state = {
      views: ''
    }
  }

  renderVideos(items, selectVideo) {
    if(!items) {
      return <p>Loading...</p>
    }
    return items.map((item, index) => {
        // console.log("mapping function", item);
        let id = item.snippet.resourceId.videoId;
        Axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            part: 'snippet,contentDetails,statistics',
            id: id,
            key: 'AIzaSyA-_-lElXcltZIBGaGiIqHiiYZIOO6bf1A'
          }
        })
        .then((res) => {
          console.log("Video Views: ", res);
          this.setState({views: res.data.items[0].statistics.viewCount})
        })
        .catch((err) => {console.log(err)})

        return <Video key={index} content={item} videoViews={this.state.views} runVideo={selectVideo} {...this.props}/>
    });
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
