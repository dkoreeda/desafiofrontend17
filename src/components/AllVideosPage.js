import React from 'react';
import Axios from 'axios';
import Nav from './Nav';
import VideosList from './VideosList';
import CurrentVideo from './CurrentVideo';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class AllVideosPage extends React.Component {

  constructor() {
    super();
    this.state = {
      playlistId: '',
      counter: 0,
      videos: [],
      currentVideo: '',
      matchVideos: [],
      isModalOpen: false
    }
  }

  componentDidMount() {
    this.searchPlaylists();
  }

  searchPlaylists(search) {
      Axios.get('https://www.googleapis.com/youtube/v3/playlists', {
          params: {
            part: 'snippet,contentDetails',
            channelId: 'UCEWHPFNilsT0IfQfutVzsag',
            maxResults: '20',
            key: 'AIzaSyCmXWIHpnA-fIuLrqfzr9PaeonezFtnmm4'
          }
      })
      .then((res) => {
        // console.log("component did mount", res);
        if(search) {
          this.searchQuery(res, search);
        } else {
          this.selectPlaylist(res);
        }
      })
      .catch((err) => {console.log(err)})
  }

  searchQuery(res, search) {
    // console.log("searchQuery", res);
    return res.data.items.map((playlist, index) => {
      // console.log(playlist);
      return this.fetchNewVideos(res.data.items[0].id, search);
    })
  }

  selectPlaylist(res) {
      this.fetchNewVideos(res.data.items[this.state.counter].id);
      this.setState({counter: this.state.counter+1});
  }

  fetchNewVideos(playlistId, search) {
      Axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
          part: 'snippet,contentDetails',
          maxResults: '12',
          playlistId: playlistId,
          key: 'AIzaSyCmXWIHpnA-fIuLrqfzr9PaeonezFtnmm4'
        }
      })
      .then((res) => {
        // console.log(res);
        this.fetchNewVideosIds(res.data.items, search);
      })
      .catch((err) => {console.log(err)})
  }

  fetchNewVideosIds(videos, search) {
      let videosIds = [];
      if(!videos) {
        return <p>Loading...</p>
      }
      videos.map((video, index) => {
        let id = video.snippet.resourceId.videoId;
        videosIds.push(id);
      });

      const jointIds = videosIds.join(',');
      this.apiCall(jointIds, search);
  }

  apiCall(jointIds, search) {
      Axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: jointIds,
          key: 'AIzaSyCmXWIHpnA-fIuLrqfzr9PaeonezFtnmm4'
        }
      })
      .then((res) => {
        // console.log("fetch videos", res);
        if(search) {
          this.matchQuery(res.data.items, search);
        } else {
          this.setState({videos: res.data.items});
        }
      })
      .catch((err) => { console.log(err) });
  }

  matchQuery(res, search) {
      // console.log(res);
      // console.log(search);
      let videos = [];
      const regexSearch = new RegExp('('+search+')', 'ig');
      res.map((video, index) => {
        let videoTitle = video.snippet.title;
        console.log(videoTitle);
        let videoDescription = video.snippet.description;
        if(videoTitle.match(regexSearch) || videoDescription.match(regexSearch)) {
            videos.push(video);
        }
      })
      this.setState({videos: videos});
  }

  selectVideo(video) {
      console.log("video was clicked", video);
      this.setState({
        isModalOpen: true,
        currentVideo: video
      });
  }

  closeModal() {
    this.setState({isModalOpen: false});
  }

  loadVideos(items) {
    console.log("Home.js - loadVideos", items);
    this.setState({videos: this.state.videos.concat(items)});
  }

  dataSubmission(search) {
    this.searchPlaylists(search);
  }

  render() {
    // console.log("All Videos Page", this.state.videos);
    // console.log("matched videos", this.state.matchVideos);
    return(
      <div>
        <Nav submit={this.dataSubmission.bind(this)}/>
        <div>
            <VideosList videos={this.state.videos} selectVideo={this.selectVideo.bind(this)} loadMoreVideos={this.loadVideos.bind(this)} number={'12'}/>
            <Modal isOpen={this.state.isModalOpen} onRequestClose={this.closeModal.bind(this)} style={customStyles}>
              <CurrentVideo video={this.state.currentVideo}/>
            </Modal>
        </div>
      </div>
    );
  }
}

export default AllVideosPage;
