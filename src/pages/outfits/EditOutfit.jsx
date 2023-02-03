import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-hot-toast";
import OutfitCard from "../../components/OutfitCard";
import SwitchSection from "../../components/SwitchSection";

function ViewOutfit() {

    const navigate = useNavigate();

    const storedToken = localStorage.getItem('authToken');

    const { outfitId } = useParams();
    const [outfit, setOutfit] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSave = () => {

        let savedOutfit = {};
        if (outfit.type === '1') { savedOutfit = { occasion: outfit.occasion, type: outfit.type, footwear: outfit.footwear._id, piece: outfit.piece._id } }
        if (outfit.type === '2') { savedOutfit = { occasion: outfit.occasion, type: outfit.type, footwear: outfit.footwear._id, top: outfit.top._id, bottoms: outfit.bottoms._id } }

        axios.put(`${process.env.REACT_APP_API_URL}/outfits/save/${outfit._id}`, savedOutfit, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(() => {
                navigate('/outfits/saved');
                toast.success(`Outfit successfully saved!`)
            })
            .catch(err => setErrorMessage(err.response.data.message));
    }

    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/outfits/delete/${outfit._id}`, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(() => navigate('/outfits/saved'))
            .catch(err => setErrorMessage(err.response.data.message));
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/outfits/view/${outfitId}`, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(response => setOutfit(response.data))
            .catch(err => setErrorMessage(err.response.data.message))
    }, [outfitId, storedToken])

    return (
        <div id="view-outfit-page" className="d-flex flex-column" style={{ minHeight: "90vh" }}>
            {!outfit ?
                <Loader />
                :
                <>
                    <div className="row text-start">
                        <div className="col col-12">
                            <h1>Edit Outfit</h1>
                            <p className="text-muted fst-italic"><small>Saved on {outfit.createdAt.split('T')[0]}</small></p>
                            <p className="occasions-tags">{outfit.occasion}</p>
                        </div>
                    </div>
                    <div className="row d-flex flex-column-reverse flex-xxl-row flex-xl-row flex-lg-column-reverse flex-md-column-reverse flex-sm-column-reverse flex-xs-column-reverse flex-xxs-column-reverse text-start justify-content-center">
                        <div className="col col-xl-4 d-flex flex-column justify-content-between">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <SwitchSection occasion={outfit.occasion} outfit={outfit} setOutfit={setOutfit} />
                                </div>
                                <div className="row mb-3 text-start mt-4">
                                    <div className="col-12">
                                        {errorMessage && <p>{errorMessage}</p>}
                                        <button className="btn btn-primary btn-lg mx-2 mt-3" onClick={handleSave}>Save Outfit</button>
                                        <button className="btn btn-danger btn-lg mx-2 mt-3" onClick={handleDelete}>Delete Outfit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col col-xl-8 outfit-preview">
                            <OutfitCard outfit={outfit} type={outfit.type} />
                        </div>
                    </div>
                </>
            }

        </div>
    );
}

export default ViewOutfit;