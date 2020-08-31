import {
    GET_DRAFTARTICLES,
    DRAFTARTICLE_ERROR,
    CLEAR_DRAFTARTICLES,
    CLEAR_DRAFTARTICLE,
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
                draftarticle: null,
                loading: false
            }
        case GET_DRAFTARTICLE:
            return {
                ...state,
                draftarticles: [],
                draftarticle: action.payload,
                loading: false
            }
        case DRAFTARTICLE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case CLEAR_DRAFTARTICLE:
            return {
                ...state,
                draftarticle: null,
                loading: false
            }
        case CLEAR_DRAFTARTICLES:
            return {
                ...state,
                draftarticles: [],
                draftarticle: null,
                loading: false
            }
        default:
            return state;
    }
}