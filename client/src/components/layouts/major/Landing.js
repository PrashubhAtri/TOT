import React from "react";
import ArticleGrid from "../Articles/ArticleGrid";
import ArticleList from "../Articles/ArticleList";

const Landing = () => {
    return(
        <div>
            <div className="container">
                <hr/>
                <div className="row">
                    <ArticleGrid />
                    <ArticleList />
                </div>
            </div>
        </div>
    )
}

export default Landing;