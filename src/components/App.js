import '../assets/styles/main.sass'
import '../assets/styles/prism-base16-ateliersulphurpool.light.css'
import React, { Component } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import CellList from '../containers/CellList'
import MenuBar from './MenuBar'
import 'smoothscroll-for-websites'

class App extends Component {
    componentDidMount() {
        // setTimeout(() => {
        //     document.documentElement.setAttribute('data-theme', 'dark')
        //     // setTimeout(() => document.documentElement.setAttribute('data-theme', ''), 3000)
        // }, 3000)

    }

    render() {
        return (
            <HashRouter >
                <div className='app'>
                    <MenuBar />
                    <div className='content'>
                    <Switch>
                        <Route path='/options'>
                            <div className='options'>
                                <h1>User settings</h1>
                                <h2>Theme</h2>
                                <div className='light-theme-btn' onClick={() => document.documentElement.setAttribute('data-theme', '')}>Light theme</div>
                                <div className='dark-theme-btn' onClick={() => document.documentElement.setAttribute('data-theme', 'dark')}>Dark theme</div>
                            </div>
                        </Route>
                        <Route path='/' render={() => (
                            <React.Fragment>
                                <h1 className='app-logo'>📝 Notes</h1>
                                <CellList />
                            </React.Fragment>
                        )}>
                        </Route>
                    </Switch>
                    </div>
                    
                </div>
            </HashRouter>
        );
    }
}

export default App;
