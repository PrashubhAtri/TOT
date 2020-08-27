import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getArticles} from "../../../actions/article";


const ArticleList = ({getArticles, article:{articles, loading}}) => {
    useEffect(()=>{
        getArticles();
    },[getArticles])
    return <Fragment>
        {loading ? (<div />) : (<Fragment>
                <div className="col-md-3 ml-auto">
                    <div className="row border border-light" >
                        <div className="col-12 text-center">
                            <ul className="side-list">
                                {articles.length > 0 ? (
                                    articles.slice(6,16).map(art=>(
                                        <div className="article-li text-cream card bg-light my-2">
                                            <div className="card-body">
                                                <h4>{art.heading}</h4>
                                            </div>
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