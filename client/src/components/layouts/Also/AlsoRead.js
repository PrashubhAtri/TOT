import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import {getArticles, getArticlesByID} from "../../../actions/article";

const AlsoRead = ({getArticles, getArticlesByID, article: {articles}}) => {
    useEffect(()=>{
        getArticles();
    },[getArticles])
    return(
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center text-cream">
                        <h3>Also Read</h3>
                    </div>
                </div>
                <div className="row">
                    {articles.length > 0 ? (
                        articles.slice(0,8).map(art=>(
                            <Fragment>
                                <div className="col-sm-3 px-2 py-2 text-center">
                                    <Link to={`/article/${art._id}`} onClick={()=>{getArticlesByID(art._id)}}>
                                        <div className="card">
                                            <div className="card-body">
                                                {art.heading}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </Fragment>
                        ))
                    ) : (<Fragment>
                            <div className="container">
                                <h3 className="text-center">No Articles Found</h3>
                            </div>
                        </Fragment>)
                    }
                </div>
            </div>
        </Fragment>
    )
}

AlsoRead.propTypes = {
    getArticles: PropTypes.func.isRequired,
    getArticlesByID:PropTypes.func.isRequired,
    article: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    article : state.article
})

export default withRouter(connect(mapStateToProps,{getArticles,getArticlesByID})(AlsoRead));