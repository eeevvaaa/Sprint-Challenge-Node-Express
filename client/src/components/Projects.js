import React, { Component } from 'react';
import axios from 'axios';
import Project from './Project';
import styled from 'styled-components';

export default class Projects extends Component {
  state = {
    projects: []
  }

  componentDidMount() {
    axios
    .get('http://localhost:8894/api/projects')
    .then(res => {
      this.setState(() => ({ 
        projects: res.data
      }));
    })
    .catch(err => {
      console.error('Server Error', err);
    });
  }

  render() {
    return(
      <Container>
        {this.state.projects.map((p, i) => (
          <Project key={i} project={p} />)
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  padding-left: 50px;
  padding-top: 50px;
`
