import React from 'react';
import styled from 'styled-components';

export default function Project(props) {
  const { name, description } = props.project;
  return(
    <ProjectDiv>
      <h3>{ name }</h3>
      <p>{ description }</p>
    </ProjectDiv>
  );
}

const ProjectDiv = styled.div`
  width: 300px;
  height: 200px;
  background-color: rgba(8, 75, 89, 0.5);
  color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
`