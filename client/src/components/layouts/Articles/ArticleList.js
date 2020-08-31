import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getArticles} from "../../../actions/article";
import {Link} from "react-router-dom";


const ArticleList = ({getArticles, article:{articles, loading}}) => {
    useEffect(()=>{
        getArticles();
    },[getArticles])
    return <Fragment>
        {loading ? (<div />) : (<Fragment>
                <div className="col-md-3 ml-auto">
                    <div className="row border border-light" >
                        <div className="col-12 text-center">
                            <div className="h4">More Articles:</div>
                            <ul className="side-list">
                                {articles.length > 0 ? (
                                    articles.slice(6,16).map(art=>(
                                        <div key={art._id}>
                                            <Link to={`/article/${art._id}`} className="text-decoration-none">
                                                <div className="article-li text-cream card my-2">
                                                    <div className="card-body p-1">
                                                        <h5>{art.heading}</h5>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))) : <h4>No Articles Found</h4>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>
}

ArticleList.propTypes = {
    getArticles: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    article : state.article
})

export default connect(mapStateToProps,{getArticles})(ArticleList);