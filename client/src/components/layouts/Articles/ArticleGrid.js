import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Spinner from "../major/Spinner";
import {getArticles} from "../../../actions/article";
import {Link} from "react-router-dom";


const ArticleGrid = ({getArticles, article:{articles, loading}}) => {
    useEffect(()=>{
        getArticles();
    },[getArticles])
    return <Fragment>
        {loading ? (<Spinner />) : (<Fragment>
            <div className="col-md-9">
                <div className="row">
                    {articles.length > 0 ? (
                        articles.slice(0,6).map(art=>(
                            <div className="col-md-6">
                                <div key={art._id}>
                                    <div className="card my-2">
                                        <div className="text-center p-2 text-cream bg-dark">
                                            <h4>
                                                {art.heading}
                                            </h4>
                                        </div>
                                        <hr/>
                                        <img src={art.featurephoto} alt="Display Image" className="card-img m-auto"/>
                                        <div placeholder="card-body m-auto text-center">
                                            <p className="card-text p-1">
                                                {art.snippet}
                                            </p>
                                            <Link to={`/article/${art._id}`} className="text-dark">
                                                <h5>Further Reading...</h5>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>))
                    ) : <h4>No Articles Found</h4>}
                </div>
            </div>
        </Fragment>
        )}
    </Fragment>
}

ArticleGrid.propTypes = {
    getArticles: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    article : state.article
})

export default connect(mapStateToProps,{getArticles})(ArticleGrid);