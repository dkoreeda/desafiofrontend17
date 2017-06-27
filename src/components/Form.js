import React, { Component } from 'react';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      keyword: ''
    }
    // console.log("Form - constructor", this.state.keyword);
  }

  handleChange(e) {
    // console.log(e.target.value);
    this.setState({keyword: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const keyword = this.state.keyword;
    this.props.handleDataSubmission(keyword);

    this.setState({keyword: ''});
    document.querySelector('#busca').style.display = "none";
  }

  render() {
    return (
      <div id="busca" className="form" style={{display: "none"}}>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            value={this.state.keyword}
            onChange={(e) => this.handleChange(e)}
          />
        </form>
      </div>
    )
  }
}

export default Form;
