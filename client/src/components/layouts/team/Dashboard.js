import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux"
import {Link} from "react-router-dom";
import {getDraftArticles} from "../../../actions/draftarticles";
import {getDrafts} from "../../../actions/drafts";
import Spinner from "../major/Spinner";

const Dashboard = ({getDraftArticles, getDrafts, auth, draftarticles, drafts}) => {
    useEffect(()=>{
        getDraftArticles()
        getDrafts()
    },[getDraftArticles, getDrafts, draftarticles.loading, drafts.loading])

    return draftarticles.loading || drafts.loading ? <Spinner /> : <Fragment>
            <h2>
                Welcome {auth.user && auth.user.name}
            </h2>
        <hr/>
        {auth.user.writer ? <Fragment>
            <div className="container">
                <h2>Articles</h2>
                <Link to="/create-article" className="btn btn-success">Create new Article</Link>
                <div className="row">
                    {draftarticles.draftarticles.length>0 ? (draftarticles.draftarticles.map(art=>(
                        <div className="col-md-6 my-1">
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
                                        <Link to={`/edit-article/${art._id}`} className="btn btn-warning text-center m-2">
                                            <h4>Edit or Submit</h4>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))) : <h4>No Previous Articles</h4>}
                </div>
            </div>
        </Fragment> : <Fragment>
            <h3>Sorry, Not a Writer :(. Contact any Admin</h3>
        </Fragment>}
        <hr/>
        {auth.user.editor ? <Fragment>
            <div className="container">
                <h2>Drafts</h2>
                <div className="row">
                    {drafts.drafts.length>0 ? (drafts.drafts.map(drf=>(
                        <div className="col-md-6 my-1">
                            <div key={drf._id}>
                                <div className="card mb-4">
                                    <header className="card-header">
                                        <h4>
                                            {drf.heading}
                                        </h4>
                                    </header>
                                    <a href="https://www.google.com"className="text-center">
                                        <img src={drf.featurephoto} alt="Display Image" className="card-img"/>
                                    </a>
                                    <div placeholder="card-body">
                                        <p className="card-text p-1">
                                            {drf.snippet}
                                        </p>
                                        <Link to={`/edit-draft/${drf._id}`} className="btn btn-warning text-center m-2">
                                            <h4>Edit or Submit</h4>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))) : <h4>No Previous Drafts</h4>}
                </div>
            </div>
        </Fragment> :<Fragment>
            <h3>Sorry, Not a Editor :(. Contact any Admin for Queries</h3>
        </Fragment>}
        </Fragment>

}

Dashboard.propTypes = {
    getDraftArticles: PropTypes.func.isRequired,
    getDrafts: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    draftarticle: PropTypes.object.isRequired,
    drafts: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth: state.auth,
    draftarticles: state.draftarticles,
    drafts: state.drafts
});

export default connect(mapStateToProps,{getDraftArticles, getDrafts})(Dashboard);