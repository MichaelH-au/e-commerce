import React, { Component } from 'react';
import Header from './components/Header/Header'
import NavBread from './components/NavBread/NavBread'

class App extends Component {
  render() {
    return (
      <div>
          <Header/>
          <NavBread/>
          <h1>hello world</h1>
      </div>
    );
  }
}

export default App;
