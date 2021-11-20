import userDataReducer from "./UserData.js"
import { combineReducers } from "redux";

const rootReducer = combineReducers({userData : userDataReducer})

export default rootReducer