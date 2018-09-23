const initialState = { cells: [] }
import db from 'db'

const cell = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_CELL':
            const newCell =
            {
                id: state.cells.reduce((maxId, cell) => Math.max(cell.id, maxId), 0) + 1,
                text: action.text || ''
            }
            const newState = { 'cells': [...state.cells].concat(newCell) }
            db.get('cells').push(newCell).write()
            return newState
        case 'EDIT_CELL':
            db.get('cells').find({ id: action.id }).assign({ text: action.text }).write()
            return Object.assign({}, state, state.cells.map(cell => cell.id === action.id ? Object.assign({}, cell, { text: action.text }) : cell))
        case 'DELETE_CELL':
            db.get('cells').remove({id: action.id}).write()
            return Object.assign({}, state, { 'cells': state.cells.filter(cell => cell.id != action.id) })
        default:
            return state
    }
}

export default cell;