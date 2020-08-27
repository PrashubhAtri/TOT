import {
    GET_DRAFTARTICLES,
    DRAFTARTICLE_ERROR,
    CLEAR_DRAFTARTICLES,
    GET_DRAFTARTICLE
} from "../actions/types";

const initialState = {
    draftarticle: null,
    draftarticles: [],
    loading: true,
    error: {}
}

export default function (state=initialState, action) {
    switch (action.type) {
        case GET_DRAFTARTICLES:
            return {
                ...state,
                draftarticles: action.payload,
                loading: false
            }
        case GET_DRAFTARTICLE:
            return {
                ...state,
                draftarticle: action.payload,
                loading: false
            }
        case DRAFTARTICLE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case CLEAR_DRAFTARTICLES:
            return {
                ...state,
                draftarticles: null,
                draftarticle: null,
                loading: false
            }
        default:
            return state;
    }
}