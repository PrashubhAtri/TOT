import {
    ARTICLE_ERROR,
    GET_ARTICLE, GET_ARTICLES
} from "../actions/types";

const initialState = {
    article:null,
    articles: [],
    loading:true,
    error: {}
}

export default function (state=initialState, action) {
    switch (action.type) {
        case GET_ARTICLE:
            return {
                ...state,
                article:action.payload,
                loading: false
            };
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload,
                loading: false
            }
        case ARTICLE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}