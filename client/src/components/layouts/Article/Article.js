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
                        <div className="col-12 text-center">
                            <h1>{article.post.heading}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-right">
                            <h2>-By {article.post.author}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col align-self-center text-center">
                            <a href="https://www.google.com" className="text-center">
                                <img src={article.post.featurephoto} alt="Display Image" className="article-img"/>
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-justify">
                            {article.post.content}
                        </div>
                    </div>
                </div>
            </Fragment>}
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