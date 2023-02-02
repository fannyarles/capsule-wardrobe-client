import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-hot-toast";
import OutfitCard from "../../components/OutfitCard";
import SwitchSection from "../../components/SwitchSection";

function ViewOutfit() {

    const navigate = useNavigate();
    const location = useLocation();

    const storedToken = localStorage.getItem('authToken');

    const { occasion, selectedOutfit } = location.state;
    const [outfit, setOutfit] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSave = () => {

        const loadingToast = toast.loading('Waiting...');

        let savedOutfit = {};
        if (outfit.type === '1') { savedOutfit = { occasion: occasion, type: outfit.type, footwear: outfit.footwear._id, piece: outfit.piece._id } }
        if (outfit.type === '2') { savedOutfit = { occasion: occasion, type: outfit.type, footwear: outfit.footwear._id, top: outfit.top._id, bottoms: outfit.bottoms._id } }

        axios.post(`${process.env.REACT_APP_API_URL}/outfits/save`, savedOutfit, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(() => {
                toast.dismiss(loadingToast);
                toast.success('Outfit successfully saved!');
                navigate('/outfits/saved')
            })
            .catch(err => {
                setErrorMessage(err.response.data.message)
                toast.dismiss(loadingToast);
                toast.error(err.response.data.message);
            });

    }

    useEffect(() => {
        if (selectedOutfit.type === '2') {
            setOutfit({ type: '2', top: selectedOutfit.top, bottoms: selectedOutfit.bottoms, footwear: selectedOutfit.footwear });
        } else if (selectedOutfit.type === '1') {
            setOutfit({ type: '1', piece: selectedOutfit.piece, footwear: selectedOutfit.footwear });
        }
    }, [selectedOutfit])

    return (<>
        {
            !outfit || !outfit ?
                <Loader />
                :
                <>
                    <div className="row d-flex text-start align-items-start justify-content-start my-3">
                        <div className="col-4 d-flex flex-column justify-content-between">
                            <div>
                                <h1>View outfit</h1>
                                <p className="occasions-tags">{occasion}</p>
                                <SwitchSection occasion={occasion} outfit={outfit} setOutfit={setOutfit} />
                            </div>
                            <div className="mt-5">
                                {errorMessage && <p>{errorMessage}</p>}
                                <button className="btn btn-primary btn-lg" onClick={handleSave}>Save Outfit</button>
                            </div>
                        </div>
                        <div className="col-8">
                            <OutfitCard outfit={outfit} type={outfit.type} />
                        </div>
                    </div>
                </>
        }
    </>);
}

export default ViewOutfit;