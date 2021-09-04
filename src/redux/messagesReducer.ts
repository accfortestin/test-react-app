const ADD_MESSAGE = 'ADD-MESSSAGE';

export type DialogDataType = {
    id: number
    name: string
}

export type MessageDataType = {
    id: number
    author: string
    message: string
}

let initialState = {
    dialogData: [
        {
            id: 1,
            name: "Peter",
        },
        {
            id: 2,
            name: "Sonya",
        },
        {
            id: 3,
            name: "Lisa",
        },
        {
            id: 4,
            name: "Joe",
        },
        {
            id: 5,
            name: "Sven",
        },
        {
            id: 6,
            name: "Josh",
        },
    ] as Array<DialogDataType>,
    messageData: [
        {
            id: 1,
            author: "me",
            message: "Blah blah blah blah blah, blah blah, blah blahblah blah blah blah.",
        },
        {
            id: 2,
            author: "me",
            message: "Blah blah blah blah blah",
        },
        {
            id: 3,
            author: "me",
            message: "Blah!",
        },
    ] as Array<MessageDataType>
}

export type InitialStateType = typeof initialState

let messagesReducer = (state = initialState, action: any):InitialStateType  => {

    switch (action.type) {
        case ADD_MESSAGE:
            let message = {
                id: state.messageData.length + 1,
                author: "me",
                message: action.newMessageText,
            }
            return {
                ...state,
                messageData: [...state.messageData, message]
            }
        default:
            return state;
    }
}

type AddMessageActionType = {
    type: typeof ADD_MESSAGE
    newMessageText: string
}

export const addMessage = (newMessageText: string): AddMessageActionType => ({
    type: ADD_MESSAGE,
    newMessageText
})

export default messagesReducer;