import { addPost, PostDataType } from "../../../redux/profileReducer";
import Posts from "./Posts"
import { connect } from "react-redux"
import React from "react";
import { AppStateType } from "../../../redux/redux-store";

type MapStateToPropsType = {
  postData: Array<PostDataType>
}

type MapDispatchToPropsType = {
  addPost: (newPostText: string) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class PostsComponent extends React.Component<PropsType> {

  onPostSend = (data: any) => {
    this.props.addPost(data.newPostText);
  }

  render() {
    return (
      <Posts
        onPostSend={this.onPostSend}
        postData={this.props.postData}
      />
    )
  }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    postData: state.profilePage.postData
  }
}

const PostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, {addPost})(PostsComponent);
  
export default PostsContainer;
