import React, { Fragment, useState } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createArticle} from "../../../actions/draftarticles";
import {Link, withRouter} from "react-router-dom";

const ArticleForm = ({createArticle, history}) => {
    const [formData,setFormData] = useState({
        heading: '',
        featurephoto:'',
        content:'',
        source:'',
        genre:''
    })

    const {
        heading,
        featurephoto,
        content,
        source,
        genre
    } = formData

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        createArticle(formData,history)
    }

    return(
        <Fragment>
            <div className="py-5">
                <div className="h2 text-center text-cream">
                    Article Create:
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <form className="text-cream text-center" onSubmit={e=>onSubmit(e)}>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Heading" name="heading" onChange={(e)=>onChange(e)} value={heading} required/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Feature Photo Link" onChange={(e)=>onChange(e)} value={featurephoto} name="featurephoto" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" placeholder="Content" name="content" onChange={(e)=>onChange(e)} value={content} required rows="15"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Source" onChange={(e)=>onChange(e)} value={source} name="source" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Genre" onChange={(e)=>onChange(e)} value={genre} name="genre" />
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

ArticleForm.propTypes = {
    createArticle: PropTypes.func.isRequired
}

export default connect(null,{createArticle})(withRouter(ArticleForm));