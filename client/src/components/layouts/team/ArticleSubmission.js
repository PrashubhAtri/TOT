import React, {Fragment, useEffect} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux"
import {Link, withRouter} from "react-router-dom";
import {SubmitArticle, getDraftArticleByID} from "../../../actions/draftarticles";
import Spinner from "../major/Spinner";

const ArticleSubmission = ({draftarticles:{loading, draftarticle}, SubmitArticle, getDraftArticleByID, history, match}) => {

    useEffect(()=>{
        if(!draftarticle) getDraftArticleByID(match.params.id);
    },[loading, getDraftArticleByID, draftarticle])

    const onClick = e => {
        e.preventDefault()
        SubmitArticle(match.params.id,history)
    }

    return loading || !draftarticle ? <Spinner /> : (
        <Fragment>
            <div className="text-center">
                For Submission:
            </div>
            <div className="py-5">
                <div className="conatiner text-cream">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1>{draftarticle.heading}</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 text-right">
                            <div className="text-center">
                                <h4 className="ml-2">- {draftarticle.author}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col align-self-center text-center">
                            <a href="https://www.google.com" className="text-center">
                                <img src={draftarticle.featurephoto} alt="Display Image" className="article-img"/>
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-justify">
                            {draftarticle.content}
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <button className="btn btn-success btn-block" onClick={(e)=>onClick(e)}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

ArticleSubmission.propTypes = {
    SubmitArticle: PropTypes.func.isRequired,
    getDraftArticleByID: PropTypes.func.isRequired,
    draftarticles: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    draftarticles: state.draftarticles
});

export default connect(mapStateToProps,{SubmitArticle, getDraftArticleByID})(withRouter(ArticleSubmission));