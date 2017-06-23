import React from 'react';
import '../css/nav.scss';
import { Link } from 'react-router-dom';
import Form from './Form';

class Nav extends React.Component {
  showMenu() {
    console.log("clicked");
    const menu = document.querySelector('#menu');
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
          <span id="search" onClick={() => this.busca()}>Search</span>
          <Form handleDataSubmission={this.handleSubmission.bind(this)}/>
          <span id="burger" onClick={() => this.showMenu()}>Menu &#9776;</span>
          <div id="menu" style={{display: "none", width: "50px", height: "50px"}} >
            <Link to="/destaque">Destaques</Link>
            <Link to="/videos" >Videos</Link>
          </div>
        </div>
      );
  }
}

export default Nav;
