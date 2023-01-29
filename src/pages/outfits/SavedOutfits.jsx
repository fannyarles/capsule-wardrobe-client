import axios from "axios";
import { useEffect, useState } from "react";
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


    return (<>
        {!outfits ?
            <Loader />
            :
            <>
                <h1>Saved Outfits ({outfits.length})</h1>
                <div className="d-inline-flex">
                    {outfits.map(outfit => <OutfitCard key={outfit._id} from="savedOutfits" outfit={outfit} />)}
                </div>
            </>
        }

    </>
    );
}

export default SavedOutfits;