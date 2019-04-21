import React, { Component } from 'react';
import './App.css';
import './Icon.css';
import Weather from './components/weather/index';
import FutureWeather from './components/future_weather/index';

class App extends Component {
  render() {
      return (
          <>
              {/*<Weather/>*/}
              <FutureWeather/>
          </>
    );
  }
}

export default App;
