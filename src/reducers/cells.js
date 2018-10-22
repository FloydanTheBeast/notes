const initialState = { cells: [] }
import db from 'db'

const cell = (state = initialState, action) => {
    let newState = state
    switch(action.type) {
        case 'ADD_CELL': {
            const newCell =
            {
                id: state.cells.reduce((maxId, cell) => Math.max(cell.id, maxId), 0) + 1,
                text: action.text || '',
                cell_type: 'PLAIN_TEXT'
            }
            newState = { 'cells': [...state.cells].concat(newCell) }
            db.get('cells').push(newCell).write()
            return newState
        }
        
        case 'EDIT_CELL': {
            db.get('cells').find({ id: action.id }).assign({ text: action.text }).write()
            return Object.assign({}, state, { cells: state.cells.map(
                cell => cell.id === action.id ? Object.assign({}, cell, { text: action.text })
                : cell)})
        }

        case 'EDIT_CELL_TYPE': {
            switch(action.cell_type) {
                case 'TODO_LIST': {
                    db.get('cells').find({ id: action.id }).assign({ cell_type: action.cell_type, todoList: [] }).unset('text').write()
                    return Object.assign({}, state, { cells: state.cells.map(
                        cell => cell.id === action.id ? Object.assign({}, cell, { todoList: [], text: undefined, cell_type: action.cell_type })
                        : cell)})
                }
                default: {
                    db.get('cells').find({ id: action.id }).set('text', action.prev_text || '').assign({ cell_type: action.cell_type }).unset('todoList').write()
                    return Object.assign({}, state, { cells: state.cells.map(
                        cell => cell.id === action.id ? Object.assign({}, cell, { cell_type: action.cell_type, text: action.prev_text })
                        : cell)})
                }
            }
        }

        case 'DELETE_CELL': {
            db.get('cells').remove({ id: action.id }).write()
            return Object.assign({}, state, { cells: state.cells.filter(cell => cell.id !== action.id)})
        }
        
        case 'ADD_TODO': {
            const todoList = state.cells.find(cell => cell.id === action.id).todoList
            let newTodo = {
                id: todoList.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1,
                isCompleted: false,
                text: ''
            }
            newState = Object.assign({}, state, { cells: state.cells.map(
                cell => cell.id === action.id ? Object.assign({}, cell, { todoList: cell.todoList.concat(newTodo)}) 
                : cell)})

            db.get('cells').find({ id: action.id }).update('todoList', todoList => todoList.concat(newTodo) ).write()
            return newState
        }

        case 'TOGGLE_TODO': {
            const newState = Object.assign({}, state, { cells: state.cells.map(
                cell => cell.id === action.cellId ? Object.assign({}, cell, { todoList: cell.todoList.map(
                    todo => todo.id === action.todoId ? Object.assign({}, todo, { isCompleted: !todo.isCompleted })
                    : todo)}) 
                : cell)})

            db.get('cells').find({ id: action.cellId }).get('todoList').find({ id: action.todoId }).update('isCompleted', isCompleted => !isCompleted).write()
            return newState
        }

        case 'EDIT_TODO': {
            const newState = Object.assign({}, state, {cells: state.cells.map(
                cell => cell.id === action.cellId ? Object.assign({}, cell, { todoList: cell.todoList.map(
                    todo => todo.id === action.todoId ? Object.assign({}, todo, { text: action.text }) 
                    : todo)})
                : cell)})

            db.get('cells').find({ id: action.cellId }).get('todoList').find({ id: action.todoId }).update('text', text => action.text).write()
            return newState
        }

        case 'DELETE_TODO': {
            const newState = Object.assign({}, state, {cells: state.cells.map(
                cell => cell.id === action.cellId ? Object.assign({}, cell, { todoList: cell.todoList.filter(
                    todo => todo.id !== action.todoId)})
                : cell)})

            db.get('cells').find({ id: action.cellId }).get('todoList').remove({ id: action.todoId }).write()
            return newState
        }

        default:
            return state
    }
}

export default cell;