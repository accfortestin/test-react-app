import messagesReducer from "./messagesReducer";
import profileReducer from "./profileReducer";

let store = {
    _state: {
        profilePage: {
            postData: [
                {
                    id: 1,
                    message: "First Post",
                    likeCounter: 0,
                },
                {
                    id: 2,
                    message: "Lorem ipsum dolor set amet",
                    likeCounter: 15,
                },
                {
                    id: 3,
                    message: "Lorem ipsum dolor set amet. Lorem!",
                    likeCounter: 11,
                },
            ],
            newPostText: "",
        },
        messagesPage: {
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
            ],
            newMessageText: '',
        },
        friends: [
            {
                id: 1,
                name: "Kelly",
                photo: "https://media1.popsugar-assets.com/files/thumbor/zKC7MbOf5N9JTHJ0p-8CwBf2Z4A/0x124:2357x2481/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/04/24/759/n/1922398/acbeb4625ea31e2319ec65.43695717_/i/Kelly-Ripa.jpg",
            },
            {
                id: 2,
                name: "Joe",
                photo: "https://pbs.twimg.com/profile_images/1366798744402993161/kxGIQiTj.jpg",
            },
            {
                id: 3,
                name: "Linda",
                photo: "https://www.film.ru/sites/default/files/people/1457409-1181678.jpg",
            }
        ]
    },
    _rerenderEntireTree() {
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer;
    },
    
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action);

        this._rerenderEntireTree(this._state);
    }

}

export default store;