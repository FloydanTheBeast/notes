import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MenuBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpened: false
        }
    }

    render() {
        return(
            <React.Fragment>
                <div onClick={() => this.setState((state) => ({ isOpened: !state.isOpened }))} className='hamburger-btn'>
                    <div className='bars'></div>
                </div>
                <div className={`menu-bar ${this.state.isOpened ? 'open' : ''}`}>
                    <ul>
                        <li>
                            <Link to='/'>Notes</Link>
                        </li>
                        <li>
                            <Link to='/options'>Options</Link>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default MenuBar