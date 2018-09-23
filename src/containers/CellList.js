import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CellList from '../components/CellList'
import * as actions from '../actions/index'

const mapStateToProps = state => ({
    cells: state.cells
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CellList)
