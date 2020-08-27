import axios from 'axios';
import {setAlert} from "./alert";

import {
    DRAFT_ERROR,
    GET_DRAFTS,
    GET_DRAFT
} from "./types";

//get current users articles
export const getDrafts = () => async dispatch => {
    try {
        const res = await axios.get('/api/drafts')

        dispatch({
            type: GET_DRAFTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: DRAFT_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}

//get current users article by id
export const getDraftByID = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/drafts/${id}`)

        dispatch({
            type: GET_DRAFT,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: DRAFT_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}

//update an article
export const editDraft = (formData, history, id) => async dispatch => {
    const config = {
        headers:{
            'Content-Type' : 'application/json'
        }
    };
    try {
        const res = await axios.put(`/api/drafts/${id}/save`,formData,config)

        dispatch({
            type: GET_DRAFTS,
            payload: res.data
        })
        dispatch(setAlert('Draft Edited','success'))
        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: DRAFT_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}

//Submit an article
export const SubmitDraft = (id, history) => async dispatch => {
    try {
        const res = await axios.delete(`/api/drafts/${id}/submit`)

        dispatch(setAlert('Draft Submitted','success'))
        history.push('/dashboard')

        console.log(res.data)
    } catch (err) {
        dispatch({
            type: DRAFT_ERROR,
            payload: {msg:err.response.statusText, status: err.response.status}
        })
    }
}