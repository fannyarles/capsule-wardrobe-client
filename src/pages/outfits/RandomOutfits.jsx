import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import OutfitCard from "../../components/OutfitCard";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import axios from "axios";
import './outfits.css';

function RandomOutfits() {

    const [params] = useSearchParams();

    const [itemParams, setItemParams] = useState(null);
    const [items, setItems] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (params) setItemParams({ occasion: params.get("occasion"), category: params.get("cat"), piece: params.get("piece"), })
    }, [params]);

    useEffect(() => {
        if (itemParams) {
            axios.get(`${process.env.REACT_APP_API_URL}/outfits/random/${itemParams.occasion}/${itemParams.category}/${itemParams.piece}`)
                .then(response => setItems(response.data))
                .catch(err => setErrorMessage(err.response.data.message))
        }
    }, [itemParams]);
    const saveOutfitIcons = document.querySelectorAll('.save-outfit-icon');

    return (<>
        <div className="row text-start">
            <div className="col col-12">

                {!items && <Loader />}
                {items &&
                    <>
                        <div className="row mb-4">
                            <div className="col col-12">
                                <h1>Matching Outfits <span className="badge bg-info fw-normal">{items.outfits.length}</span></h1>
                                <p className="text-capitalize occasions-tags">{items.occasion}</p>
                            </div>
                        </div>


                        {!items.outfits.length &&
                            <div className="row d-inline-flex">
                                <p>No outfits fit your search.</p>
                                <Link to='/outfits/random' className="btn btn-primary">Back to search</Link>
                            </div>
                        }


                        <div className="row d-flex flex-wrap">
                            {items.outfits.map(outfit => {
                                return <>
                                    <div className="col col-4 d-flex align-content-stretch">
                                        <div className="card">
                                            <div className="save-outfit-button">
                                                <Link to='/outfits/random/view/single' state={{ occasion: items.occasion, selectedOutfit: outfit }} className="save-outfit-icon">
                                                    <i class="bi bi-heart"></i>
                                                    <i class="bi bi-heart-fill"></i>
                                                </Link>
                                            </div>
                                            <OutfitCard occasion={items.occasion} outfit={outfit} type={outfit.type} />
                                        </div>
                                    </div>
                                </>
                            })}
                        </div>
                    </>
                }

            </div>
        </div>
    </>
    );
}

export default RandomOutfits;