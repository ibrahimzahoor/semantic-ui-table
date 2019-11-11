import React from 'react';
import { Container, Segment, Input } from 'semantic-ui-react';

import logo from './logo.svg';
import UserGrid from './components/UserGrid';

import './App.css';

function App() {
  return (
    <Container>
      <UserGrid />
    </Container>
  );
}

export default App;
