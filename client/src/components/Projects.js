import React, { Component } from 'react';
import axios from 'axios';
import Project from './Project';

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
      <div>
        {this.state.projects.map((p, i) => (
          <Project key={i} project={p} />)
        )}
      </div>
    );
  }
}

