import { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom';
import ProfileStatus from './ProfileStatus';
import { getUserStatus, updateUserStatus } from '../../../redux/profileReducer'
import { userStatusGetter } from '../../../redux/state-selectors';
import { AppStateType } from '../../../redux/redux-store';

type LocalStateProps = {
    match: any
}

type MapStateToPropsType = {
    userStatus: string
}

type MapDispatchToPropsType = {
    getUserStatus: (userID: number) => void
    updateUserStatus: (status: string) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & LocalStateProps

const ProfileStatusContainer = (props: PropsType) => {

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

    const changeStatus = (e: any) => {
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

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    userStatus: userStatusGetter(state)
});

export default 
    withRouter(
    connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, { getUserStatus, updateUserStatus }
)(ProfileStatusContainer));