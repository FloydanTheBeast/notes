import React, { Component } from 'react'

export default class componentName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false
        }
        this.editor = null
    }

    componentDidMount() {
        document.addEventListener('click', e => this.handleOutsideClick(e))
    }

    render() {
        const { cellId, todo, toggleTodo, editTodo } = this.props
        let elem

        if (this.state.isEditing) {
            elem = (
                <input
                    ref={node => this.editor = node}
                    onChange={(e) => editTodo(cellId, todo.id, e.target.value)}
                    type='text'
                    value={todo.text}
                    onBlur={() => this.setState({ isEditing: false })}>
                </input>
            )
        } else {
            elem = (
                <div className='todo-item'>
                    <input 
                        id={`cell-${cellId}-todo-${todo.id}`}
                        type='checkbox'
                        onChange={() => toggleTodo(cellId, todo.id)}
                        checked={todo.isCompleted} />
                    <label
                        htmlFor={`cell-${cellId}-todo-${todo.id}`}
                        className='switch' />
                    <label
                        placeholder='test'
                        className='todo-text'
                        onClick={() => this.setState({ isEditing: true })}>
                        {todo.text}
                    </label>
                </div>
            )
        }

        return (
            <li className={todo.isCompleted ? 'completed' : ''}>
                {elem}
            </li>
        )
    }

    handleOutsideClick(e) {
        if (this.editor)
            this.editor.focus()
    }
}
