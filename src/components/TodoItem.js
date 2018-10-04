import React, { Component } from 'react'

export default class componentName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false
        }
    }

    render() {
        const { cellId, todo, toggleTodo, editTodo } = this.props
        console.log(this.props)

        let elem
        if (this.state.isEditing) {
            elem = (
                <input
                    onChange={(e) => editTodo(cellId, todo.id, e.target.value)}
                    type='text'>
                </input>
            )
        } else {
            elem = (
                <div onClick={() => this.setState({ isEditing: true })} className='todo-item'>
                    <input 
                        type='checkbox'
                        onChange={() => toggleTodo(cellId, todo.id)}
                        checked={todo.isCompleted} />
                    <label>{todo.text}</label>
                </div>
            )
        }

        return (
            <li className='todo-item'>
                {elem}
            </li>
        )
    }
}
