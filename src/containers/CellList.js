import { connect } from 'react-redux'
import CellList from '../components/CellList'
import addCell from '../actions'

const mapStateToProps = state => ({
    cells: state.cells
})

const mapDispatchToProps = dispatch => ({
    addCell: text => dispatch(addCell(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(CellList)
