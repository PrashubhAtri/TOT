import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Spinner from "../major/Spinner";
import {getArticles} from "../../../actions/article";
import {Link} from "react-router-dom";


const Entertainment = ({getArticles, article:{articles, loading}}) => {
    useEffect(()=>{
        getArticles();
    },[getArticles])
    return <Fragment>
        {loading ? (<Spinner />) : (<Fragment>
                <div className="col-md-12">
                    <div className="row">
                        {articles.length > 0 ? (
                            articles.filter(article => (article.genre==="Entertainment" || article.genre==="entertainment")).map(art=>(
                                <div className="col-md-6">
                                    <div key={art._id}>
                                        <div className="card mb-4">
                                            <header className="card-header">
                                                <h4>
                                                    {art.heading}
                                                </h4>
                                            </header>
                                            <a href="https://www.google.com"className="text-center">
                                                <img src={art.featurephoto} alt="Display Image" className="card-img"/>
                                            </a>
                                            <div placeholder="card-body">
                                                <p className="card-text p-1">
                                                    {art.snippet}
                                                </p>
                                                <Link to={`/article/${art._id}`}>
                                                    <h4>Further Reading</h4>
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

Entertainment.propTypes = {
    getArticles: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    article : state.article
})

export default connect(mapStateToProps,{getArticles})(Entertainment);