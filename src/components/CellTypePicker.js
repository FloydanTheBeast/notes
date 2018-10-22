import React, { Component } from 'react'
import InlineSVG from 'svg-inline-react'

export default class CellTypePicker extends Component{
    constructor (props) {
        super(props)
        this.state = {
            currentType: props.cell.cell_type
        }
    }

    componentDidUpdate() {
        this.setState({
            currentType: this.props.cell.cell_type
        })
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.cell.cell_type === this.state.currentType)
            return false
        else
            return true
    }
    
    render() {
        const { cell, editCellType, resetState , getCurrentContent } = this.props
        const { currentType } = this.state
        console.log(getCurrentContent())
        return (
            <div className='cell-type-picker'>
                <div className={`cell-type-plaintext ${currentType === 'PLAIN_TEXT' ? 'active' : ''}`}
                    onClick={() => editCellType(cell.id, 'PLAIN_TEXT', getCurrentContent())}>
                    <InlineSVG src={require('../assets/Icons/PlainTextIcon.svg')} />
                </div>
                <div className={`cell-type-markdown ${currentType === 'MARKDOWN' ? 'active' : ''}`}
                    onClick={() => editCellType(cell.id, 'MARKDOWN', getCurrentContent())}>
                    <InlineSVG src={require('../assets/Icons/MarkdownIcon.svg')} />
                </div>
                <div className={`cell-type-todolist ${currentType === 'TODO_LIST' ? 'active' : ''}`}
                    onClick={() => {
                        resetState()
                        editCellType(cell.id, 'TODO_LIST')
                    }}>
                    <InlineSVG src={require('../assets/Icons/TodoListIcon.svg')} />
                </div>
                <div
                    className={`cell-type-code ${currentType === 'CODE_SNIPPET' ? 'active' : ''}`}
                    onClick={() => editCellType(cell.id, 'CODE_SNIPPET', getCurrentContent())}>
                    <InlineSVG src={require('../assets/Icons/CodeIcon.svg')} />
                </div>
            </div>
        )
    }
}