import { addMessage, DialogDataType, MessageDataType } from "../../redux/messagesReducer"
import { connect } from "react-redux"
import Messages from "./Messages"
import React from "react"
import withAuthRedirect from "../../hoc/withAuthRedirect"
import { compose } from "redux"
import { AppStateType } from "../../redux/redux-store"

type MapStateToPropsType = {
    dialogData: Array<DialogDataType>
    messageData: Array<MessageDataType>
}

type MapDispatchToPropsType = {
    addMessage: (newMessageText: string) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class MessagesComponent extends React.Component<PropsType> {

    onSendMessage = (data: any) => {
        if (data.newMessageText.length) {
            this.props.addMessage(data.newMessageText);
        }
    }

    render() {
        return (
            <Messages
                dialogData={this.props.dialogData}
                messageData={this.props.messageData}
                onSendMessage={this.onSendMessage}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogData: state.messagesPage.dialogData,
        messageData: state.messagesPage.messageData
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, { addMessage })
)(MessagesComponent);