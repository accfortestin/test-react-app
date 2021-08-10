import authReducer from "./auth-reducer";
import friendsReducer from "./friendsReducer";
import messagesReducer from "./messagesReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import thunk from "redux-thunk";
import appReducer from "./app-reducer";

const { createStore, combineReducers, applyMiddleware, compose } = require("redux");

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    friends: friendsReducer,
    users: usersReducer,
    auth: authReducer,
    app: appReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;