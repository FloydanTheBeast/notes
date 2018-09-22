const initialState = { cells: [] }
import db from 'db'

const cell = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_CELL':
            const newCell =
            {
                id: state.cells.reduce((maxId, cell) => Math.max(cell.id, maxId), 0) + 1,
                text: action.text
            }
            const newState = { 'cells': [...state.cells].concat(newCell) }
            db.get('cells').push(newCell).write()
            return newState
        default:
            return state
    }
}

export default cell;