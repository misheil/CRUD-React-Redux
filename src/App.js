import React, { Component } from 'react';

import { Link  } from 'react-router-dom';


import './App.css';

class App extends Component {
  render() {
    return ( 
      <div className="ui container">
        <div className="ui four item menu">
          <Link className="item" activeclassname="active"  to="/">Home</Link>
          <Link className="item" activeclassname="active"  to="/games">Games</Link>
          <Link className="item" activeclassname="active"  to="/games/new">Add New Game</Link>
          <Link className="item" activeclassname="active"  to="/Register">Register</Link>
        </div>

        
      </div>
    );
  }
}

export default App;