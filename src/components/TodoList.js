import React, { Component } from 'react'
import TodoItem from './TodoItem'

export default class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false
        }
    }

    render() {
        const { cellId,
                todoList, 
                addTodo, 
                toggleTodo, 
                editTodo,
                deleteTodo } = this.props
        
        return (
            <React.Fragment>
                <div className='todo-add-btn' onClick={() => addTodo(cellId)}>Add todo</div>
                <ul className='todo-list'>
                    {todoList.map((todo, index) =>
                        <TodoItem 
                            cellId={cellId}
                            key={index}
                            todo={todo}
                            editTodo={editTodo}
                            toggleTodo={toggleTodo}
                            deleteTodo={deleteTodo} />
                    )}
                </ul>
            </React.Fragment>
        )
    }
}
