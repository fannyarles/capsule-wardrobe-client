import { Link } from "react-router-dom";
import errorImg from './../assets/error-404.jpg'

function Error404() {

    return (
        <div id="error-page">
            <div className="row">
                <h1>Page not found.</h1>
                <div className="col col-12 col-xs-12 col-xxs-12 col-md-12 col-lg-8 col-xl-6 col-xxl-5 mx-auto">
                    <div className="my-4" style={{
                        width: "100%",
                        borderRadius: "2px",
                        paddingTop: "100%",
                        backgroundImage: `url("${errorImg}")`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center center"
                    }}></div>
                    <Link to='/' className="btn btn-primary mt-2">Back to home</Link>

                </div>
            </div>
        </div>
    );

}

export default Error404;