import React, { Fragment, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editArticle, getDraftArticleByID} from "../../../actions/draftarticles";
import {withRouter} from "react-router-dom";
import Spinner from "../major/Spinner";

const EditArticleForm = ({draftarticles:{loading, draftarticle}, editArticle, getDraftArticleByID, history, match}) => {

    const [formData,setFormData] = useState({
        heading: '',
        featurephoto:'',
        content:'',
        source:'',
        genre:'',
        snippet:''
    })

    useEffect(()=>{
        if(!draftarticle) getDraftArticleByID(match.params.id);
        if(!loading && draftarticle){
            setFormData({
                heading: loading || !draftarticle.heading ? '' : draftarticle.heading,
                featurephoto: loading || !draftarticle.featurephoto ? '' : draftarticle.featurephoto,
                content: loading || !draftarticle.content ? '' : draftarticle.content,
                source: loading || !draftarticle.source ? '' : draftarticle.source,
                genre: loading || !draftarticle.genre ? '' : draftarticle.genre,
                snippet: loading || !draftarticle.snippet ? '' : draftarticle.snippet
            })
        }
    },[loading, getDraftArticleByID, draftarticle])

    const {
        heading,
        featurephoto,
        content,
        source,
        genre,
        snippet
    } = formData

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        editArticle(formData,history,match.params.id)
    }

    return loading || !draftarticle ? <Spinner /> : (
        <Fragment>
            <div className="py-5">
                <div className="h2 text-center text-cream">
                    Article Edit :
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
                                    <input type="text" className="form-control" placeholder="Snippet*" onChange={(e)=>onChange(e)} value={snippet} name="snippet" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Source" onChange={(e)=>onChange(e)} value={source} name="source" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Beat" onChange={(e)=>onChange(e)} value={genre} name="genre" />
                                </div>
                                <button type="submit" className="btn btn-success">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

EditArticleForm.propTypes = {
    editArticle: PropTypes.func.isRequired,
    getDraftArticleByID: PropTypes.func.isRequired,
    draftarticles: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    draftarticles: state.draftarticles
})

export default connect(mapStateToProps,{editArticle, getDraftArticleByID})(withRouter(EditArticleForm));