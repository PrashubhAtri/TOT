import {combineReducers} from "redux";
import alert from './alert';
import article from './articles';
import auth from "./auth";
import draftarticles from "./draftarticles"
import drafts from "./drafts";

export default combineReducers({
    alert,
    article,
    auth,
    draftarticles,
    drafts
})