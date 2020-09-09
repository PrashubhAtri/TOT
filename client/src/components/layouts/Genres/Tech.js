import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Spinner from "../major/Spinner";
import {getArticles} from "../../../actions/article";
import {Link} from "react-router-dom";


const Technology = ({getArticles, article:{articles, loading}}) => {
    useEffect(()=>{
        getArticles();
    },[getArticles])
    return <Fragment>
        {loading ? (<Spinner />) : (<Fragment>
                <div className="col-md-12">
                    <div className="row">
                        {articles.length > 0 ? (
                            articles.filter(article => (article.genre==="Technology" || article.genre==="Tech" || article.genre==="technology" || article.genre==="tech")).map(art=>(
                                <div className="col-md-6" key={art._id}>
                                    <div>
                                        <div className="card my-2">
                                            <div className="text-center p-2 text-cream bg-light">
                                                <h4>
                                                    {art.heading}
                                                </h4>
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-12 p-2">
                                                            <b>
                                                                {art.genre.toUpperCase()}
                                                            </b>
                                                            {' | '}
                                                            <i>
                                                                {art.author.toUpperCase()}
                                                            </i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr/>
                                            <img src={art.featurephoto} alt="Display Image" className="card-img m-auto"/>
                                            <div placeholder="card-body m-auto text-center">
                                                <p className="card-text p-1">
                                                    {art.snippet}
                                                </p>
                                                <div className="text-center">
                                                    <Link to={`/article/${art._id}`} className="text-dark">
                                                        <h5>Read More...</h5>
                                                    </Link>
                                                </div>
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

Technology.propTypes = {
    getArticles: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    article : state.article
})

export default connect(mapStateToProps,{getArticles})(Technology);