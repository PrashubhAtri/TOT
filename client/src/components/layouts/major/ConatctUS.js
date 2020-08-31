import React from "react";

const ConatctUs = () => {
    return(
        <div>
            <div className="container">
                <hr/>
                <div className="row">
                    <div className="col-12 text-cream text-decoration-none text-center">
                        <p>
                            Email:
                            <a href="mailto:theoddetribune@gmail.com">
                                {' '} theoddetribune@gmail.com
                            </a>
                        </p>
                    </div>
                    <div className="col-12 text-cream text-center">
                        <ul className="iconlist">
                            <a href="https://www.facebook.com/theoddetribune" className="text-decoration-none text-cream p-2">
                                <li className="facebook">
                                    <i className="fab fa-facebook"/>
                                </li>
                            </a>
                            <a href="https://twitter.com/TheOddeTribune" className="text-decoration-none text-cream p-2">
                                <li>
                                    <i className="fab fa-twitter"/>
                                </li>
                            </a>
                            <a href="https://www.instagram.com/theoddetribune/" className="text-decoration-none text-cream p-2">
                                <li>
                                    <i className="fab fa-instagram"/>
                                </li>
                            </a>
                            <a href="https://www.linkedin.com/company/the-odde-tribune/" className="text-decoration-none text-cream p-2">
                                <li>
                                    <i className="fab fa-linkedin-in"/>
                                </li>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConatctUs;