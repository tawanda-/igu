import React, { Component } from 'react';
import './App.css';
import Search from './Search/Search';
import Results from './Results/Results';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
        <Results />
      </div>
    );
  }
}

export default App;
