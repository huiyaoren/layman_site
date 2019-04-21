import React, { Component } from 'react';
import './App.css';
import './Icon.css';
import Weather from './components/weather/index';

class App extends Component {
  render() {
      return (
          <>
              <Weather/>
          </>
    );
  }
}

export default App;
