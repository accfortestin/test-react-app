import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom';
import { compose } from 'redux'
import ProfileStatus from './ProfileStatus';
import { getUserStatus, updateUserStatus } from '../../../redux/profileReducer'
import { userStatusGetter } from '../../../redux/state-selectors';

const ProfileStatusContainer = (props) => {

    let userID = props.match.params.userID;
    props.getUserStatus(userID);

    let [editMode, setEditMode] = useState(false);
    let [newStatus, setNewStatus] = useState(props.userStatus)

    useEffect( () => {
        setNewStatus(props.userStatus);
    }, [props.userStatus])

    const enableEditMode = () => {
        setEditMode(true);
    }

    const disableEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(newStatus);
    }

    const changeStatus = (e) => {
        setNewStatus(e.target.value);
    }

    return <ProfileStatus
        enableEditMode={enableEditMode}
        disableEditMode={disableEditMode}
        changeStatus={changeStatus}
        editMode={editMode}
        newStatus={newStatus}
        userStatus={props.userStatus}
    />
}

let mapStateToProps = (state) => ({
    userStatus: userStatusGetter(state)
});

export default compose(
    withRouter,
    connect(mapStateToProps, { getUserStatus, updateUserStatus })
)(ProfileStatusContainer);