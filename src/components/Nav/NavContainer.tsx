import React from 'react'
import { connect } from "react-redux"
import { compose } from 'redux'
import { AppStateType } from '../../redux/redux-store'
import { authUserIDGetter } from '../../redux/state-selectors'
import Nav from './Nav'

type MapStateToPropsType = {
    userID: number
}

class NavComponent extends React.Component<MapStateToPropsType> {
    render() {
        return <Nav {...this.props} />
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    userID: authUserIDGetter(state)
});

export default compose(
    connect<MapStateToPropsType, AppStateType>(mapStateToProps, {})
)(NavComponent);