import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import OutfitCard from "../../components/OutfitCard";

function SavedOutfits() {

    const storedToken = localStorage.getItem('authToken');

    const [outfits, setOutfits] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5005/outfits/saved`, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(response => setOutfits(response.data))
            .catch(err => setErrorMessage(err.response.data.message));
    }, []);


    return (
        <div className="row text-start">
            <div className="col col-12">
                {!outfits && <Loader />}
                {outfits &&
                    <>
                        <div className="row mb-5">
                            <div className="col col-12">
                                <h1>Saved Outfits <span className="badge bg-info fw-normal">{outfits.length}</span></h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-12">
                                <div className="d-inline-flex flex-wrap">

                                    {!outfits.length &&
                                        <div className="row d-inline-flex">
                                            <p>No outfits yet.</p>
                                            <Link to='/outfits/random' className="btn btn-primary">Create outfits</Link>
                                        </div>
                                    }

                                    {outfits.map(outfit => {
                                        return (
                                            <div className="col col-4 d-flex align-content-stretch">
                                                <div className="card-actions d-flex align-items-baseline">
                                                    <div className="edit-outfit-icon ms-2">
                                                        <Link to={`/outfits/view/${outfit._id}`} className="me-3">
                                                            <i class="bi bi-arrow-repeat"></i>
                                                        </Link>
                                                    </div>
                                                    <p className="occasions-tags">{outfit.occasion}</p>
                                                </div>
                                                <OutfitCard key={outfit._id} from="savedOutfits" outfit={outfit} type={outfit.type} />
                                            </div>);
                                    })}

                                </div>
                            </div>
                        </div>
                    </>
                }

            </div>
        </div>
    );
}

export default SavedOutfits;