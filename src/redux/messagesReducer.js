const ADD_MESSAGE = 'ADD-MESSSAGE';

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
    ],
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
    ]
}

let messagesReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let message = {
                id: state.messageData.length + 1,
                author: "me",
                message: action.newMessageText,
            }
            let stateCopy = {
                ...state
            };
            if (stateCopy.newMessageText !== "") {
                stateCopy.messageData = [...state.messageData, message];
            }
            return stateCopy;
        default:
            return state;
    }
}

export const addMessageActionCreator = (newMessageText) => ({
    type: ADD_MESSAGE,
    newMessageText
})

export default messagesReducer;