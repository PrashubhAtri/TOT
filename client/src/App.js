import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layouts/major/Landing";
import NewsLetter from "./components/layouts/major/NewsLetter";
import Footer from "./components/layouts/major/Footer";
import Article from "./components/layouts/Article/Article";
import './App.css';
import NavBar from "./components/layouts/major/Navbar";
import Alert from "./components/layouts/Extras/Alert";
import National from "./components/layouts/Genres/National";

import {Provider} from 'react-redux';
import store from "./store";
import International from "./components/layouts/Genres/International";
import Politics from "./components/layouts/Genres/Politics";
import Editorial from "./components/layouts/Genres/Editorials";
import Lifestyle from "./components/layouts/Genres/Lifestyle";
import Entertainment from "./components/layouts/Genres/Entertainment";
import About from "./components/layouts/major/About";
import Founders from "./components/layouts/major/Founders";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Login from "./components/auth/Login";
import Dashboard from "./components/layouts/team/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import ArticleForm from "./components/layouts/team/Article-Form";
import EditDraftForm from "./components/layouts/team/Draft-Form";
import EcoAndBuisness from "./components/layouts/Genres/EcoAndBuisness";
import Technology from "./components/layouts/Genres/Tech";
import Sports from "./components/layouts/Genres/Sports";
import ConatctUs from "./components/layouts/major/ConatctUS";
import EditArticleForm from "./components/layouts/team/EditArticleForm";
import ArticleSubmission from "./components/layouts/team/ArticleSubmission";

if(localStorage.token){
    setAuthToken(localStorage.token)
}

const App = () => {

    useEffect(()=>{
        store.dispatch(loadUser())
    },[loadUser])

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <NavBar />
                    <Route exact path="/" component={Landing}/>
                    <section className="container">
                        <Alert />
                        <Switch>
                            <Route exact path='/login' component={Login}/>
                            <PrivateRoute exact path='/dashboard' component={Dashboard} />
                            <PrivateRoute exact path='/create-article' component={ArticleForm} />
                            <PrivateRoute exact path="/edit-article/:id" component={EditArticleForm} />
                            <PrivateRoute exact path="/submit-article/:id" component={ArticleSubmission}/>
                            <PrivateRoute exact path="/edit-draft/:id" component={EditDraftForm} />
                            <Route exact path='/article/:id' component={Article} />
                            <Route exact path='/genre/national' component={National}/>
                            <Route exact path='/genre/international' component={International}/>
                            <Route exact path='/genre/politics' component={Politics}/>
                            <Route exact path='/genre/editorial' component={Editorial}/>
                            <Route exact path='/genre/lifestyle' component={Lifestyle}/>
                            <Route exact path='/genre/entertainment' component={Entertainment}/>
                            <Route exact path='/genre/ecoandbuisness' component={EcoAndBuisness}/>
                            <Route exact path='/genre/tech' component={Technology}/>
                            <Route exact path='/genre/sports' component={Sports}/>
                            <Route exact path='/about' component={About}/>
                            <Route exact path='/founders' component={Founders}/>
                            <Route exact path='/contactus' component={ConatctUs}/>
                        </Switch>
                    </section>
                    <NewsLetter/>
                    <Footer />
                </Fragment>
            </Router>
        </Provider>
    );
}

export default App;
