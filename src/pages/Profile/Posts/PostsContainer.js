import { addPost } from "../../../redux/profileReducer";
import Posts from "./Posts"
import { connect } from "react-redux"
import React from "react";

class PostsComponent extends React.Component {

  onPostSend = (data) => {
    this.props.addPost(data.newPostText);
  }

  render() {
    return (
      <Posts
        onPostSend={this.onPostSend}
        postData={this.props.profilePage.postData}
      />
    )
  }
}

let mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage
  }
}

const PostsContainer = connect(mapStateToProps, {addPost})(PostsComponent);
  
export default PostsContainer;
