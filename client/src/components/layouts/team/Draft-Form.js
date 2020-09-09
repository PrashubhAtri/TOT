import React, { Fragment, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editDraft, getDraftByID, SubmitDraft } from "../../../actions/drafts";
import {Link, withRouter} from "react-router-dom";

const EditDraftForm = ({drafts:{loading, draft}, editDraft, getDraftByID, SubmitDraft, history, match}) => {

    const [formData,setFormData] = useState({
        heading: '',
        featurephoto:'',
        content:'',
        source:'',
        genre:'',
        snippet:'',
        author: ''
    })

    useEffect(()=>{
        if(!draft) getDraftByID(match.params.id);
        if(!loading && draft){
            setFormData({
                heading: loading || !draft.heading ? '' : draft.heading,
                featurephoto: loading || !draft.featurephoto ? '' : draft.featurephoto,
                content: loading || !draft.content ? '' : draft.content,
                source: loading || !draft.source ? '' : draft.source,
                genre: loading || !draft.genre ? '' : draft.genre,
                snippet: loading || !draft.snippet ? '' : draft.snippet,
                author: loading || !draft.author ? '' : draft.author
            })
        }
    },[getDraftByID, loading, draft])

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
        editDraft(formData,history,match.params.id)
    }

    const onClick = e => {
        e.preventDefault()
        SubmitDraft(match.params.id, history)
    }

    return(
        <Fragment>
            <div className="py-5">
                <div className="h2 text-center text-cream">
                    Draft Edit :
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
                    <button className="btn btn-success m-2 text-center" onClick={(e)=>onClick(e)}>
                        <h4>Submit Draft to Display as Post :).</h4>
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

EditDraftForm.propTypes = {
    editArticle: PropTypes.func.isRequired,
    getDraftArticleByID: PropTypes.func.isRequired,
    SubmitDraft: PropTypes.func.isRequired,
    drafts: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    drafts: state.drafts
})

export default connect(mapStateToProps,{editDraft, getDraftByID, SubmitDraft})(withRouter(EditDraftForm));