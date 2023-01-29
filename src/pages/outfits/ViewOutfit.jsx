import axios from "axios";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-hot-toast";

function ViewOutfit() {

    const navigate = useNavigate();
    const location = useLocation();

    const storedToken = localStorage.getItem('authToken');

    const { outfit } = location.state;
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSave = () => {

        let savedOutfit = {};
        if (outfit.type === 'onePiece') { savedOutfit = { type: outfit.type, footwear: outfit.footwear._id, piece: outfit.piece._id } }
        if (outfit.type === 'twoPiece') { savedOutfit = { type: outfit.type, footwear: outfit.footwear._id, top: outfit.top._id, bottoms: outfit.bottoms._id } }

        const saveOutfit = axios.post(`http://localhost:5005/outfits/save`, savedOutfit, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(() => navigate('/outfits/saved'))
            .catch(err => setErrorMessage(err.response.data.message));


        toast.promise(
            saveOutfit,
            {
                loading: 'Loading',
                success: () => `Outfit successfully saved!`,
                error: () => `Error: ${errorMessage}`,
            },
            {
                style: {
                    minWidth: '250px',
                },
                success: {
                    duration: 3000,
                    icon: '✔',
                },
            }
        );
    }

    return (<>
        {!outfit ?
            <Loader />
            :
            <>
                <div id="outfit-preview">
                    {outfit.type === "onePiece" &&
                        <>
                            <img src={outfit.piece.imageUrl} className={outfit.piece.type.toLowerCase()} alt="item" width="150px" />
                            <img src={outfit.footwear.imageUrl} className={outfit.footwear.type.toLowerCase()} alt="item" width="150px" />
                        </>
                    }
                    {outfit.type === "twoPiece" &&
                        <>
                            <img src={outfit.top.imageUrl} className={outfit.top.type.toLowerCase()} alt="item" width="150px" />
                            <img src={outfit.bottoms.imageUrl} className={outfit.bottoms.type.toLowerCase()} alt="item" width="150px" />
                            <img src={outfit.footwear.imageUrl} className={outfit.footwear.type.toLowerCase()} alt="item" width="150px" />
                        </>
                    }
                </div>
                <div>
                    {errorMessage && <p>{errorMessage}</p>}
                    <button className="btn btn-primary" onClick={handleSave}>Save Outfit</button>
                </div>
            </>
        }

    </>
    );
}

export default ViewOutfit;