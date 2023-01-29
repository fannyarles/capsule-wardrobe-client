import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import OutfitCard from "../../components/OutfitCard";

function SavedOutfits() {

    const storedToken = localStorage.getItem('authToken');

    const [outfits, setOutfits] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    console.log(outfits)

    useEffect(() => {
        axios.get(`http://localhost:5005/outfits/saved`, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(response => setOutfits(response.data))
            .catch(err => setErrorMessage(err.response.data.message));
    }, []);


    return (<>
        {!outfits ?
            <Loader />
            :
            <>
                {outfits.map(outfit => <OutfitCard outfit={outfit} />)}
            </>
        }

    </>
    );
}

export default SavedOutfits;