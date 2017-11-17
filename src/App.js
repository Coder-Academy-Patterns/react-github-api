import React, { Component } from 'react';
import './App.css';
import ShowReadme from './components/GitHub/ShowReadme'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ShowReadme />
      </div>
    );
  }
}

export default App;
