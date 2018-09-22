import React, { Component } from 'react'
import Cell from './Cell'

class CellList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { cells } = this.props
        return (
            <ul className='cell-list'>
                {cells.map(cell => (
                    <Cell>{cell.text}</Cell>
                ))}
            </ul>
        )
    }
}

export default CellList