// import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function ViewOutfit() {

    const location = useLocation();
    const { outfit } = location.state;

    console.log(outfit)

    return (<>

        {!outfit ?
            <></>
            :
            <>
                <div className="card-group d-inline-flex">
                    {outfit.map(item =>
                        <div className="card text-center" key={item._id}>
                            <div style={{ backgroundImage: `url(${item.imageUrl})`, margin: "auto", width: "500px", height: "500px", backgroundSize: "contain", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }}></div>
                            {/* <img className="card-img-top my-3" src={item.imageUrl} alt={item.category} style={{ maxHeight: "350px", width: "80%", margin: "auto" }} /> */}
                            <div className="card-body">
                                <h5 className="card-title">{item.category}</h5>
                                <p className="card-text">{item.brand}</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </div>
                        </div>
                    )}
                </div>
            </>
        }

    </>
    );
}

export default ViewOutfit;