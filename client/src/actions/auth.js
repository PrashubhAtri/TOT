import axios from 'axios';
import {setAlert} from "./alert";
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_DRAFTARTICLES
} from "./types";

import {
    USER_LOADED,
    AUTH_ERROR
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//Load User
export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try{
        const res = await axios.get('/api/auth');
        dispatch({
            type:USER_LOADED,
            payload: res.data
        })
    }catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//LOGIN
export const login = (username,password) => async dispatch => {
    const config = {
        headers:{
            'Content-Type' : 'application/json'
        }
    };
    const body = JSON.stringify({username,password});
    try{
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    }catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

//LOGOUT
export const logout = () => dispatch => {
    dispatch({type:CLEAR_DRAFTARTICLES})
    dispatch({ type: LOGOUT })
}