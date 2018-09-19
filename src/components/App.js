import '../assets/styles/main.sass';
import React, { Component } from 'react';
import TextEditor from './Editor';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, Electron!</h1>
        <p>I hope you enjoy using basic-electron-react-boilerplate to start your dev off right!</p>
        <TextEditor>
        
        </TextEditor>
      </div>
    );
  }
}

export default App;
