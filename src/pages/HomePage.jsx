import logo from './../assets/logo_C_white.png'

function HomePage() {

    return (<>
        <div className="col-xxl-12">
            <div id="banner" className="row text-center">
                <div className="row d-flex align-items-center py-5">
                    <div className="col-lg-12">
                        <h1 className="display-2 lh-5 mb-3">Efficiency and Sustainability.<br />All-in-One.</h1>
                        <div className="d-grid mt-5 gap-3 d-md-flex justify-content-md-center">
                            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Try MinFit</button>
                            <button type="button" className="btn btn-primary btn-lg px-4" onClick={() => document.getElementById('features').scrollIntoView()}>Learn more</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="features" className="bg-light">
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-start p-5 text-start">
                            <div className="col-lg-8 py-5">
                                <h1 className="display-4 fw-normal">Your next step to success.</h1>
                                <p className="lead fw-normal">
                                    Steve Jobs, Mark Zuckerberg, Albert Einstein, Barack Obama, Carrie Donovan, Jean Nouvel, Janelle Monae...
                                    Great minds empowered by great habits, one of which being... always dressing the same way.
                                    Start clearing your mind and building your brand with MinFit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sep"></div>
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-end position-relative overflow-hidden p-5 text-end">
                            <div className="col-lg-8 py-5">
                                <h1 className="display-4 fw-normal">With sustainability at heart.</h1>
                                <p className="lead fw-normal">
                                    Productivity paired with great ethics, a recipe for success. Reducing the number of items you need to own will reduce desicion fatigue as well as your carbon print!
                                    Save brain power and the planet at the same time with MinFint!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="pricing" className="row justify-content-center py-5">
                <div className="col col-xxl-6 col-xl-8 col-lg-10 col-md-10">
                    <div className="pricing-header p-3 pt-5 pb-md-4 mx-auto text-center">
                        <h1 className="display-4 fw-normal">Pricing</h1>
                        <p className="fs-5 text-muted">Quickly build a cohesive wardrobe and get rid of decision fatigue in your daily life. Join MinFit today with the plan that best fits with your needs.</p>
                    </div>
                    <div className="row row-cols-1 row-cols-md-3 mb-3 text-center pb-5">
                        <div className="col">
                            <div className="card mb-4 rounded-2 shadow-sm">
                                <div className="card-header text-uppercase border-0 py-3 text-white bg-primary">
                                    <h4 className="my-0 fw-normal">Free</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">$0<small className="text-muted fw-light">/mo</small></h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>35 items included</li>
                                        <li>15 outfits</li>
                                    </ul>
                                    <a href="/signup"><button type="button" className="w-100 btn btn-lg btn-primary">Sign up for free</button></a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-4 rounded-2 shadow-sm">
                                <div className="card-header text-uppercase border-0 py-3 text-white bg-primary">
                                    <h4 className="my-0 fw-normal">Pro</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">$25<small className="text-muted fw-light">/mo</small></h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>75 items included</li>
                                        <li>35 outfits</li>
                                        <li>+</li>
                                        <li>Try before you buy</li>
                                    </ul>
                                    <a href="/signup"><button type="button" className="w-100 btn btn-lg btn-primary">Get started</button></a>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-4 rounded-2 shadow-sm border-primary">
                                <div className="card-header text-uppercase border-0 py-3 text-white bg-primary border-primary">
                                    <h4 className="my-0 fw-normal">Enterprise</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">$80<small className="text-muted fw-light">/mo</small></h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Unlimited items</li>
                                        <li>Unlimited outfits</li>
                                        <li>+</li>
                                        <li>Try before you buy</li>
                                        <li>Personal Shopper</li>
                                    </ul>
                                    <a href="/signup"><button type="button" className="w-100 btn btn-lg btn-primary">Contact us</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <div id="footer" className="row bg-dark pt-4 px-4 fw-light">
                <div className="d-flex text-start text-light flex-wrap">
                    <div className="col col-lg-3 col-md-6 p-lg-3 mx-auto pb-4">
                        <h1><img src={logo} alt="logo" width="30%" height="auto" /></h1>
                    </div>
                    <div className="col col-lg-3 col-md-6 p-lg-3 mx-auto pb-4">
                        <h6>About us</h6>
                        <ul>
                            <li>Our Story</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                    <div className="col col-lg-3 col-md-6 p-lg-3 mx-auto pb-4">
                        <h6>Contact</h6>
                        <ul>
                            <li>Contact us</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div className="col col-lg-3 col-md-6 p-lg-3 mx-auto pb-4">
                        <h6>Confidentiality</h6>
                        <ul>
                            <li>Privacy Policy</li>
                            <li>Cookie Policy</li>
                            <li>Terms & Conditions</li>
                        </ul>
                    </div>
                </div>
            </div>


        </div>
    </>);
}

export default HomePage;