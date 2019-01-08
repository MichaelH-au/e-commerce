import React, { Component } from 'react';
import Header from './components/Header/Header'
import NavBread from './components/NavBread/NavBread'
import Home from './containers/Home/Home'

class App extends Component {
  render() {
    return (
      <div>
          <Header/>
          <NavBread/>
          <Home/>
      </div>
    );
  }
}

export default App;
