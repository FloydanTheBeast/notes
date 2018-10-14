import React, { Component } from 'react'
import InlineSVG from 'svg-inline-react'

export default class componentName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            isDeleting: false
        }
        this.editor = null
    }

    componentDidMount() {
        document.addEventListener('click', e => this.handleOutsideClick(e))
    }

    render() {
        const { cellId, todo, toggleTodo, editTodo, deleteTodo } = this.props
        let elem

        if (this.state.isEditing) {
            elem = (
                <input
                    className='todo-editor'
                    ref={node => this.editor = node}
                    onChange={(e) => editTodo(cellId, todo.id, e.target.value)}
                    type='text'
                    value={todo.text}
                    onBlur={() => this.setState({ isEditing: false })}
                    >
                </input>
            )
        } else {
            elem = (
                <div
                    className='todo-item'>
                        <input 
                        id={`cell-${cellId}-todo-${todo.id}`}
                        type='checkbox'
                        onChange={() => toggleTodo(cellId, todo.id)}
                        checked={todo.isCompleted} />
                    <label
                        htmlFor={`cell-${cellId}-todo-${todo.id}`}
                        className='switch' />
                    <label
                        className='todo-text'
                        onClick={() => this.setState({ isEditing: true })}>
                        {todo.text}
                    </label>
                    <div
                        onClick={() => deleteTodo(cellId, todo.id)}
                        className='todo-delete-btn'>
                        <InlineSVG src={require('../assets/Icons/DeleteButtonIcon.svg')} />
                    </div>
                </div>
            )
        }

        return (
            <li className={todo.isCompleted ? 'completed' : ''}>
                {elem}
            </li>
        )
    }

    handleMouseDown() {
        this.deleteTimeout = window.setTimeout(() => {
            this.setState({ isDeleting: true })
        }, 1500)
    }

    handleMouseUp() {
        if (!this.state.isDeleting) {
            window.clearTimeout(this.deleteTimeout)
            this.setState({ isDeleting: false })
        }
    }

    handleOutsideClick(e) {
        if (this.editor)
            this.editor.focus()
    }
}
