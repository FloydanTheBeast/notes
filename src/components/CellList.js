import React, { Component } from 'react'
import Cell from './Cell'

class CellList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        document.addEventListener('keydown', e => this.handleKeyDown(e))
    }

    render() {
        const { cells, actions } = this.props
        
        return (
            <React.Fragment>
                <ul className='cell-list'>
                    {cells.map(cell => (
                        <Cell key={cell.id} cell={cell} actions={actions} />
                    ))}
                </ul>
                <div onClick={() => this.props.actions.addCell()} className='add-new-cell-btn'></div>
            </React.Fragment>
        )
    }

    handleKeyDown(e) {
        const { addCell } = this.props.actions
        if (e.code === 'KeyN' && e.ctrlKey) addCell()
    }
}

export default CellList