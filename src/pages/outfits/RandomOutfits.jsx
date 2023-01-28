// import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import OutfitCard from "../../components/OutfitCard";
import Loader from "../../components/Loader";

function RandomOutfits() {

    const location = useLocation();
    const { outfits, itemParams } = location.state;

    return (<>

        {!outfits ? <Loader /> :
            <>
                <h1>{outfits.length} outfits generated</h1>
                <p className="text-capitalize">{itemParams.occasion}</p>
                <div className="d-inline-flex">
                    {outfits.map(outfit => <OutfitCard outfit={outfit} />)}
                </div>
            </>
        }

    </>
    );
}

export default RandomOutfits;