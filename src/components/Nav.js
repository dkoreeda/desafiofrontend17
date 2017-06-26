import React from 'react';
import '../css/nav.scss';
import { Link } from 'react-router-dom';
import Form from './Form';
import logo from '../css/img/ficticia.png';
import search from '../css/img/search.png';
import destaque from '../css/img/destaque.png';
import videos from '../css/img/videos.png';

class Nav extends React.Component {
  showMenu() {
    console.log("clicked");
    const menu = document.querySelector('#menu-options');
    if(menu.style.display === "none") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  }

  busca() {
    console.log("busca");
    const busca = document.querySelector('#busca');
    if(busca.style.display === "none") {
      busca.style.display = "block";
    } else {
      busca.style.display = "none";
    }
  }

  handleSubmission(search) {
    this.props.submit(search);
  }

  render() {
    console.log(this.props);
      return (
        <div id="nav">
          <Link to="/"><img id="logo" src={logo} alt="logo" /></Link>
          <div id="menu">
            <span id="search" onClick={() => this.busca()}><img src={search} alt="magnified glass"/></span>
            <Form handleDataSubmission={this.handleSubmission.bind(this)}/>
            <span id="burger" onClick={() => this.showMenu()}>Menu &#9776;
              <div style={{display: "none"}} id="menu-options">
                <Link to="/destaque"><img src={destaque} alt="link destaque" />Destaques</Link>
                <Link to="/videos"><img src={videos} alt="link videos" />Videos</Link>
              </div>
            </span>
          </div>
        </div>
      );
  }
}

export default Nav;
