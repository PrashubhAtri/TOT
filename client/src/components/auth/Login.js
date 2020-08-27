import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import {login} from "../../actions/auth";
import PropTypes from 'prop-types';

const Login = ({ login, isAuthenticated }) => {

    const [ formData, setFormData ] = useState({
        username:'',
        password:''
    });
    const { username, password } = formData;

    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        login(username, password)
    }

    //Redirect if logged in
    if(isAuthenticated){
        return <Redirect to="/dashboard"/>
    }

    return(
        <Fragment>
            <div className="py-5">
                <div className="h2 text-center text-cream">
                    Login :
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <form className="text-cream text-center" onSubmit={e => onSubmit(e)}>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Username" name="username" value={username} onChange={e => onChange(e)} required/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={e=> onChange(e)} required/>
                                </div>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);