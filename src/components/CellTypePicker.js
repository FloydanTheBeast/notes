import React from 'react'

export default (props) => {
    const { cell, editCellType } = props
    return (
        <div className='cell-type-picker'>
            <div onClick={() => editCellType(cell.id, 'PLAIN_TEXT')}>Text</div>
            <div onClick={() => editCellType(cell.id, 'MARKDOWN')}>MD</div>
            <div onClick={() => editCellType(cell.id, 'TODO_LIST')}>ToDos</div>
        </div>
    )
}
