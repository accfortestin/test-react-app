import React from 'react'
import { connect } from "react-redux"
import { compose } from 'redux'
import { authUserIDGetter } from '../../redux/state-selectors'
import Nav from './Nav'

class NavComponent extends React.Component {
    componentDidMount() {
    }
    render() {
        return <Nav {...this.props} />
    }
}

let mapStateToProps = (state) => ({
    userID: authUserIDGetter(state)
});

export default compose(
    connect(mapStateToProps, {})
)(NavComponent);