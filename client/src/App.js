import React, { Component } from 'react';
import './App.css';
import Projects from './components/Projects';
import styled from 'styled-components';

class App extends Component {
  render() {
    return (
      <AppDiv>
        <Projects />
      </AppDiv>
    );
  }
}

export default App;

const AppDiv = styled.div`
  background-color: #000000;
  min-height: 100px;
`
