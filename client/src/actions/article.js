import axios from 'axios';
import {
    GET_ARTICLE,
    GET_ARTICLES,
    ARTICLE_ERROR,
} from './types';

// Get all articles
export const getArticles = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_ARTICLES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ARTICLE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get articles by genre
export const getArticlesByGenre = genre => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/genre/${genre}`);

        dispatch({
            type: GET_ARTICLES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ARTICLE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get article by ID
export const getArticlesByID = articleId => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${articleId}`);

        dispatch({
            type: GET_ARTICLE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ARTICLE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};