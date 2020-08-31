import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Spinner from "../major/Spinner";
import { getArticlesByID} from "../../../actions/article";
import AlsoRead from "../Also/AlsoRead";

const Article = ({getArticlesByID, article:{article, loading}, match}) => {

    useEffect(()=>{
        getArticlesByID(match.params.id)
    },[getArticlesByID])

    return(
        <Fragment>
            {article===null || loading ? <Spinner/> : <Fragment>
                <div className="conatiner text-cream">
                    <div className="row">
                        <div className="col-12 text-center p-3">
                            <h1>{article.post.heading}</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 p-2">
                                        <b>
                                            {article.post.genre.toUpperCase()}
                                        </b>
                                        {' | '}
                                        <i>
                                            {article.post.author.toUpperCase()}
                                        </i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col align-self-center text-center p-2">
                            <a href="https://www.google.com" className="text-center">
                                <img src={article.post.featurephoto} alt="Display Image" className="article-img"/>
                            </a>
                        </div>
                    </div>
                    <div className="row p-3">
                        <div className="col-12 text-justify text-dark">
                            {article.post.content}
                        </div>
                    </div>
                </div>
            </Fragment>}
            <hr/>
            <AlsoRead />
        </Fragment>
    )
}

Article.propTypes = {
    getArticlesByID: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    article: state.article
})

export default connect(mapStateToProps,{getArticlesByID})(Article);