import React, { Component } from 'react';
import './App.css';
import './Icon.css';
import Weather from './components/weather/index';
import FutureWeather from './components/future_weather/index';
import Datetime from './components/datetime/index';
import Gold from './components/gold/index';

class App extends Component {
  render() {
      return (
          <>
          {/*<Weather/>*/}
          {/*<FutureWeather/>*/}
          <Datetime/>
          <Gold/>
          </>
      );
  }
}

export default App;
