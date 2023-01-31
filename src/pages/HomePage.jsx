import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

function HomePage() {

    return (<>
        <div className="col-xxl-12">
            <div id="banner" className="row text-center">
                <div className="row d-flex align-items-center py-5">
                    <div className="col-lg-12">
                        <h1 className="display-2 lh-5 mb-3">Efficiency and Sustainability.<br />All-in-One.</h1>
                        <div className="d-grid mt-5 gap-3 d-md-flex justify-content-md-center">
                            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Try MinFit</button>
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => document.getElementById('features').scrollIntoView()}>Learn more</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="features" className="row">
                <div className="d-flex justify-content-start position-relative overflow-hidden p-5 text-start bg-light">
                    <div className="col-lg-6 py-5">
                        <h1 className="display-4 fw-normal">Your next step to success.</h1>
                        <p className="lead fw-normal">
                            Steve Jobs, Mark Zuckerberg, Albert Einstein, Barack Obama, Carrie Donovan, Jean Nouvel, Janelle Monae...
                            Great minds empowered by great habits, one of which being... always dressing the same way.
                            Start clearing your mind and building your brand with MinFit.
                        </p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="d-flex justify-content-end position-relative overflow-hidden p-5 text-end bg-light">
                    <div className="col-lg-5 py-5">
                    </div>
                    <div className="col-md-6 p-lg-5 mx-auto">
                        <h1 className="display-4 fw-normal">With sustainability at heart.</h1>
                        <p className="lead fw-normal">
                            Productivity paired with great ethics, a recipe for success. Reducing the number of items you need to own will reduce desicion fatigue as well as your carbon print!
                            Save brain power and the planet at the same time with MinFint!
                        </p>
                    </div>
                </div>
            </div>

            <div id="pricing" className="row justify-content-center py-5">
                <div className="col col-6">
                    <div className="pricing-header p-3 pt-5 pb-md-4 mx-auto text-center">
                        <h1 className="display-4 fw-normal">Pricing</h1>
                        <p className="fs-5 text-muted">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It’s built with default Bootstrap components and utilities with little customization.</p>
                    </div>
                    <div className="row row-cols-1 row-cols-md-3 mb-3 text-center pb-5">
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">Free</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">$0<small className="text-muted fw-light">/mo</small></h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>10 users included</li>
                                        <li>2 GB of storage</li>
                                        <li>Email support</li>
                                        <li>Help center access</li>
                                    </ul>
                                    <button type="button" className="w-100 btn btn-lg btn-outline-primary">Sign up for free</button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">Pro</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">$15<small className="text-muted fw-light">/mo</small></h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>20 users included</li>
                                        <li>10 GB of storage</li>
                                        <li>Priority email support</li>
                                        <li>Help center access</li>
                                    </ul>
                                    <button type="button" className="w-100 btn btn-lg btn-primary">Get started</button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm border-primary">
                                <div className="card-header py-3 text-white bg-primary border-primary">
                                    <h4 className="my-0 fw-normal">Enterprise</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">$29<small className="text-muted fw-light">/mo</small></h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>30 users included</li>
                                        <li>15 GB of storage</li>
                                        <li>Phone and email support</li>
                                        <li>Help center access</li>
                                    </ul>
                                    <button type="button" className="w-100 btn btn-lg btn-primary">Contact us</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <div className="row bg-dark p-4">
                <div className="d-flex position-relative overflow-hidden text-start text-light">
                    <div className="col-md-3 p-lg-3 mx-auto">
                        <h6 className="fw-light">About us</h6>
                        <p className="fw-light">
                            <ul>
                                <li>Our Story</li>
                                <li>Blog</li>
                            </ul>
                        </p>
                    </div>
                    <div className="col-md-3 p-lg-3 mx-auto">
                        <h6 className="fw-light">Contact</h6>
                        <p className="fw-light">
                            <ul>
                                <li>Contact us</li>
                                <li>FAQ</li>
                            </ul>
                        </p>
                    </div>
                    <div className="col-md-3 p-lg-3 mx-auto">
                        <h6 className="fw-light">Confidentiality</h6>
                        <p className="fw-light">
                            <ul>
                                <li>Privacy Policy</li>
                                <li>Cookie Policy</li>
                                <li>Terms & Conditions</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>


        </div>
    </>);
}

export default HomePage;