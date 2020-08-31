import React from "react";
import Chhavi from "../../resources/imgs/chhavi.jpeg";
import Rishabh from "../../resources/imgs/rishabh.jpeg";
import Palak from "../../resources/imgs/palak.jpeg";
import Shamita from "../../resources/imgs/shamita'.jpeg";

const Founders = () => {
    return(
        <div>
            <div className="container">
                <hr/>
                <div className="row">
                    <div className="col-12 text-center">
                        <div className="row">
                            <div className="col-md-6">
                                <h3>Chhavi Manchanda</h3>
                                <img src={Chhavi} alt="Chhavi" className="founders"/>
                                <p>
                                    “Many can paint a pretty picture of a world that can sometimes be pretty nasty,
                                    but only a valiant few can paint its true picture. In today’s fast pace world where
                                    the mainstream media and the alternative social media sphere is deviating from the
                                    ethics of journalism, we at TOT would strive to get our voice of truth heard.”
                                </p>
                            </div>
                            <div className="col-md-6">
                                <h3>Shamita Sinha</h3>
                                <img src={Shamita} alt="Shamita" className="founders"/>
                                <p>
                                    “When someone else refuses to turn on the light, you have
                                    to be the one who goes against the order to turn it on. While
                                    the internet fills up with misinformation and propaganda each day,
                                    I believe it is the right of every citizen to receive only truthful
                                    and factual news filtering out propaganda. The Odde Tribune is the
                                    place where I believe we re-lay the basic structure of Journalism,
                                    one which is for the people.”
                                </p>
                            </div>
                            <div className="col-md-6">
                                <h3>Rishabh Sachdeva</h3>
                                <img src={Rishabh} alt="Rishabh" className="founders"/>
                                <p>
                                    “For me the world is a stage and I of course this actor. But in the
                                    contemporary scenario, the world runs on news and the lack of truth
                                    and trivialised information is corrupting the foundation of society.
                                    I believe with the power of our pens we together can bring a change
                                    in the community by providing factual news and truth to our readers.”
                                </p>
                            </div>
                            <div className="col-md-6">

                                <h3>Palak Chawla</h3>
                                <img src={Palak} alt="Palak" className="founders"/>
                                <p>
                                    “If someone says it’s raining and another person says it’s dry, the job is not to quote them both,but to look out the window and find which is true.
                                    Being a staunch supporter of ethics and morals in journalism, observing how we come across biased reporting and even fake news these days drove me to
                                    build The Odde Tribune, a platform where everyone can have access to truth and facts without a drop of judgement.”
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Founders;