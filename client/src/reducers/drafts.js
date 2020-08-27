import {
    GET_DRAFTS,
    DRAFT_ERROR,
    CLEAR_DRAFTS,
    GET_DRAFT
} from "../actions/types";

const initialState = {
    draft: null,
    drafts: [],
    loading: true,
    error: {}
}

export default function (state=initialState, action) {
    switch (action.type) {
        case GET_DRAFTS:
            return {
                ...state,
                drafts: action.payload,
                loading: false
            }
        case GET_DRAFT:
            return {
                ...state,
                draft: action.payload,
                loading: false
            }
        case DRAFT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case CLEAR_DRAFTS:
            return {
                ...state,
                drafts: null,
                draft: null,
                loading: false
            }
        default:
            return state;
    }
}