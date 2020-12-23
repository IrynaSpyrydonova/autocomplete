import React, { Component } from 'react';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...'
    }
  }
  
  componentDidMount() {
    fetch('/schools')
      .then(res => res.json())
      .then(res => 
        this.setState({message: res})
          );
  }

  
  render() {

    const messages = Object.keys(this.state.message).map((key) => {
      return (
          <li key={key}>{this.state.message[key].name}</li>
      )
      })
    return (
      <div>
        <h1>Home</h1>
    <div>{messages}</div>
    
      </div>
    );
  }
}