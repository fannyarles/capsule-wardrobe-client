// import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import OutfitCard from "../../components/OutfitCard";

function RandomOutfits() {

    const { state } = useLocation();
    const { outfits } = state;

    // const [itemParams, setItemParams] = useState({ category: '', pieceItem: '', occasion: '' });
    // const [outfits, setOutfits] = useState(null);
    // console.log(outfits)

    return (<>

        {!outfits ?
            <></>
            :
            <>
                <h1>{outfits.length} outfits generated</h1>
                {outfits.map(outfit => <OutfitCard outfit={outfit} />)}
            </>
        }

    </>
    );
}

export default RandomOutfits;