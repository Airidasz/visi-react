import { combineReducers } from "redux";
import errorsReducer from "./ErrorsReducer.js";

const rootReducer = combineReducers({errors: errorsReducer})

export default rootReducer