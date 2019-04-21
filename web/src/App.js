import React, { Component } from 'react';
import './App.css';
import './Icon.css';
import Weather from './components/weather/index';
import FutureWeather from './components/future_weather/index';
import Datetime from './components/datetime/index';
import Gold from './components/gold/index';
import MyBalance from './components/my_balance/index';

class App extends Component {
  render() {
      return (
          <>
          {/*<Weather/>*/}
          {/*<FutureWeather/>*/}
          <Datetime/>
          <Gold/>
          <MyBalance/>
          </>
      );
  }
}

export default App;
