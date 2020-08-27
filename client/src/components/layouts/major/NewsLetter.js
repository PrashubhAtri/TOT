import React from "react";

const NewsLetter = () => {
    return(
        <div>
            <div className="container-fluid py-2">
                <div className="row justify-content-center ">
                    <div className="col-md-6 text-center">
                        <div className="card grad-black text-light border border-warning">
                            <div className="card-body">
                                <form action="www.google.com">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1" className="h4 text-success">
                                            <h4>Subscribe to our Newsletter:</h4>
                                        </label>
                                        <button className="btn btn-dark">
                                            <a href="https://mailchi.mp/fb6fa9355f3b/theodde" className="text-info">
                                                Please Fill this form.
                                            </a>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter;