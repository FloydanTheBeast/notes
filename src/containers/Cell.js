import { connect } from 'react-redux'
import Cell from '../components/Cell'
import * as actions from '../actions/index'

const mapStateToProps = state => ({
    text: state.text,
    id: state.id
})

const mapDispatchToProps = dispatch => ({
    addCell: text => dispatch(actions.addCell(text)),
    deleteCell: id => dispatch(actions.deleteCell(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cell)
