import React from 'react'

export default (props) => {
    const { cell, editCellType, resetState } = props
    return (
        <div className='cell-type-picker'>
            <div onClick={() => editCellType(cell.id, 'PLAIN_TEXT')}>Text</div>
            <div onClick={() => editCellType(cell.id, 'MARKDOWN')}>MD</div>
            <div onClick={() => {
                resetState()
                editCellType(cell.id, 'TODO_LIST')
            }}>
                ToDos
            </div>
        </div>
    )
}
