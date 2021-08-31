import { addMessageActionCreator } from "../../redux/messagesReducer"
import { connect } from "react-redux"
import Messages from "./Messages"
import React from "react"
import withAuthRedirect from "../../hoc/withAuthRedirect"
import { compose } from "redux"


class MessagesComponent extends React.Component {

    onSendMessage = (data) => {
        if (data.newMessageText.length) {
            this.props.sendMessage(data.newMessageText);
        }
    }

    render() {
        return (
            <Messages
                dialogData={this.props.messagesPage.dialogData}
                messageData={this.props.messagesPage.messageData}
                onSendMessage={this.onSendMessage}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageText) => {
            dispatch(addMessageActionCreator(newMessageText));
        }
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(MessagesComponent);