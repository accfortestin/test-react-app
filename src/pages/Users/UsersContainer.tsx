import { AppStateType } from '../../redux/redux-store';
import { connect } from "react-redux"
import Users from "./Users"
import { setCurrentPage, getUsers, follow, unfollow, setPortionNumber, UsersType } from "../../redux/usersReducer"
import React from "react"
import Preloader from "../../components/Preloader/Preloader"

type MapStateToPropsType = {
  pageSize: number
  currentPage: number
  isFetching: boolean
  usersList: Array<UsersType>
  followingInProgress: Array<number>
  totalUsersCount: number
  portionNumber: number
}

type MapDispatchToPropsType = {
  getUsers: (pageSize: number, currentPage: number) => void
  setCurrentPage: (currentPage: number) => void
  follow: (id: number) => void
  unfollow: (id: number) => void
  setPortionNumber: (number: number) => void
}

export type PropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersComponent extends React.Component<PropsType> {

  componentDidMount() {
    this.props.getUsers(this.props.pageSize, this.props.currentPage);
  }

  componentWillUnmount() {
    this.props.setCurrentPage(1);
  }

  onPageChange = (currentPage: number) => {
    this.props.getUsers(this.props.pageSize, currentPage)
  }

  onFollowButtonClick = (id: number, isFollowed: boolean) => {

    if (!isFollowed) {
      this.props.follow(id);
    } else {
      this.props.unfollow(id);
    }

  }

  render() {
    return <>
      {this.props.isFetching ? <Preloader />
        : <Users
          usersList={this.props.usersList}
          onPageChange={this.onPageChange}
          currentPage={this.props.currentPage}
          onFollowButtonClick={this.onFollowButtonClick}
          followingInProgress={this.props.followingInProgress}
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          portionNumber={this.props.portionNumber}
          setPortionNumber={this.props.setPortionNumber}
        />}
    </>
  }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    usersList: state.users.users,
    pageSize: state.users.pageSize,
    totalUsersCount: state.users.totalUsersCount,
    currentPage: state.users.currentPage,
    isFetching: state.users.isFetching,
    followingInProgress: state.users.followingInProgress,
    portionNumber: state.users.portionNumber
  }
}

const UsersContainer = connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, { setCurrentPage, getUsers, follow, unfollow, setPortionNumber })(UsersComponent);
  
export default UsersContainer;
