import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { createStore } from 'redux'
import { Provider }  from 'react-redux'
import CellReducer from './reducers/cells'
import db from 'db'

const store = createStore(CellReducer, db.getState())

let root = document.createElement('div')
root.id = "root"
document.body.appendChild( root)

render(
    <Provider store={store}>
        <App />
    </Provider>,
 document.getElementById('root') )
