import '../assets/styles/main.sass';
import React, { Component } from 'react'
import CellList from '../containers/CellList'
import MenuBar from './MenuBar'

class App extends React.Component {
    render() {
        return (
            <div className='app'>
                {/* <MenuBar /> */}
                <div className='content'>
                    <h1 className='app-logo'>📝 Notes</h1>
                    <CellList />
                </div>
            </div>
        );
    }
}

export default App;
