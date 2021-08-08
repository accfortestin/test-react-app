import { connect } from "react-redux"
import Users from "./Users"
import { setCurrentPage, getUsers, follow, unfollow } from "../../redux/usersReducer"
import React from "react"
import Preloader from "../../components/Preloader/Preloader"

class UsersComponent extends React.Component {

  componentDidMount() {
    this.props.getUsers(this.props.pageSize, this.props.currentPage);
  }

  componentWillUnmount() {
    this.props.setCurrentPage(1);
  }

  onPageChange = (currentPage) => {
    this.props.getUsers(this.props.pageSize, currentPage)
  }

  onFollowButtonClick = (id, isFollowed) => {

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
          pagination={this.props.pagination}
        />}
    </>
  }
}

let mapStateToProps = (state) => {
  return {
    usersList: state.users.users,
    pageSize: state.users.pageSize,
    totalUsersCount: state.users.totalUsersCount,
    currentPage: state.users.currentPage,
    isFetching: state.users.isFetching,
    followingInProgress: state.users.followingInProgress,
    pagination: state.users.pagination
  }
}

const UsersContainer = connect(mapStateToProps, { setCurrentPage, getUsers, follow, unfollow })(UsersComponent);
  
export default UsersContainer;
