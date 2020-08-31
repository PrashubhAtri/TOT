import axios from 'axios';
import {setAlert} from "./alert";

import {
    DRAFTARTICLE_ERROR,
    GET_DRAFTARTICLES,
    GET_DRAFTARTICLE,
    CLEAR_DRAFTARTICLE
} from "./types";

//get current users articles
export const getDraftArticles = () => async dispatch => {
    try {
        const res = await axios.get('/api/articles')

        dispatch({
            type: GET_DRAFTARTICLES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: DRAFTARTICLE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}

//get current users article by id
export const getDraftArticleByID = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/articles/${id}`)

        dispatch({
            type: GET_DRAFTARTICLE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: DRAFTARTICLE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}

//create an article
export const createArticle = (formData, history) => async dispatch => {
    const config = {
        headers:{
            'Content-Type' : 'application/json'
        }
    };
    try {
        const res = await axios.post('/api/articles/new',formData,config)

        dispatch({
            type: GET_DRAFTARTICLES,
            payload: res.data
        })
        dispatch(setAlert('Article Created','success'))
        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: DRAFTARTICLE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}

//update an article
export const editArticle = (formData, history, id) => async dispatch => {
    const config = {
        headers:{
            'Content-Type' : 'application/json'
        }
    };
    try {
        const res = await axios.put(`/api/articles/${id}/save`,formData,config)

        dispatch({
            type: GET_DRAFTARTICLES,
            payload: res.data
        })
        dispatch(setAlert('Article Edited','success'))
        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: DRAFTARTICLE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}

//Submit an article
export const SubmitArticle = (id, history) => async dispatch => {
    try {
        const res = await axios.delete(`/api/articles/${id}/submit`)

        dispatch(setAlert('Article Submitted','success'))
        history.push('/dashboard')

        console.log(res.data)
    } catch (err) {
        dispatch({
            type: DRAFTARTICLE_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}