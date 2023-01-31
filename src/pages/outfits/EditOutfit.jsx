import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-hot-toast";
import OutfitCard from "../../components/OutfitCard";

function ViewOutfit() {

    const navigate = useNavigate();

    const storedToken = localStorage.getItem('authToken');

    const { outfitId } = useParams();

    const [outfit, setOutfit] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const switchItem = (itemType, currentItemId) => {

        const loadingToast = toast.loading('Waiting...');
        axios.get(`http://localhost:5005/dressing/switch/${outfit.occasion}/${itemType}/${currentItemId}`, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(response => {

                if (!response.data) {
                    toast.dismiss(loadingToast);
                    toast.error(`No more ${itemType.toLowerCase()} in your dressing.`);
                    return;
                }

                switch (itemType) {
                    case 'Tops':
                        setOutfit({ ...outfit, top: response.data });
                        break;
                    case 'Bottoms':
                        setOutfit({ ...outfit, bottoms: response.data });
                        break;
                    case 'Footwear':
                        setOutfit({ ...outfit, footwear: response.data });
                        break;
                    case 'One-Pieces':
                        setOutfit({ ...outfit, piece: response.data });
                        break;
                    default:
                        console.log('error')
                        break;
                }

                toast.dismiss(loadingToast);
                toast.success('Item switched!');
            })
            .catch(err => setErrorMessage(err.response.data.message));
    }

    const handleSave = () => {

        let savedOutfit = {};
        if (outfit.type === 'onePiece') { savedOutfit = { type: outfit.type, footwear: outfit.footwear._id, piece: outfit.piece._id } }
        if (outfit.type === 'twoPiece') { savedOutfit = { footwear: outfit.footwear._id, top: outfit.top._id, bottoms: outfit.bottoms._id } }

        const saveOutfit = axios.put(`http://localhost:5005/outfits/save/${outfit._id}`, savedOutfit, { headers: { "Authorization": `Bearer ${storedToken}` } })
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

    const handleDelete = () => {
        axios.delete(`http://localhost:5005/outfits/delete/${outfit._id}`, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(() => navigate('/outfits/saved'))
            .catch(err => setErrorMessage(err.response.data.message));
    }

    useEffect(() => {
        axios.get(`http://localhost:5005/outfits/view/${outfitId}`, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(response => setOutfit(response.data))
            .catch(err => setErrorMessage(err.response.data.message))
    }, [outfitId, storedToken])

    return (
        <div id="view-outfit-page">
            {!outfit ?
                <Loader />
                :
                <>
                    <div className="row d-flex text-start justify-content-center">
                        <div className="col-3">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <h1>View outfit</h1>
                                    <p className="text-muted fst-italic"><small>Saved on {outfit.createdAt.split('T')[0]}</small></p>
                                    <p className="occasions-tags">{outfit.occasion}</p>
                                </div>
                            </div>
                            {outfit.type === "onePiece" &&
                                <>
                                    <div className="card border p-4 mb-4">
                                        <div className="row d-flex align-items-center">
                                            <div className="col col-12">
                                                <h6>{outfit.piece.category} from {outfit.piece.brand}</h6>
                                                <button className="btn btn-primary" onClick={() => switchItem(outfit.piece.type, outfit.piece._id)}>Switch!</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card border p-4">
                                        <div className="row d-flex align-items-center">
                                            <div className="col col-12">
                                                <h6>{outfit.footwear.category} from {outfit.footwear.brand}</h6>
                                                <button className="btn btn-primary" onClick={() => switchItem(outfit.footwear.type, outfit.footwear._id)}>Switch!</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                            {outfit.type === "twoPiece" &&
                                <>
                                    <div className="card border p-4 mb-4">
                                        <div className="row d-flex align-items-center">
                                            <div className="col col-12">
                                                <h6>{outfit.top.category} from {outfit.top.brand}</h6>
                                                <button className="btn btn-primary" onClick={() => switchItem(outfit.top.type, outfit.top._id)}>Switch!</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card border p-4 mb-4">
                                        <div className="row d-flex align-items-center">
                                            <div className="col col-12">
                                                <h6>{outfit.bottoms.category} from {outfit.bottoms.brand}</h6>
                                                <button className="btn btn-primary" onClick={() => switchItem(outfit.bottoms.type, outfit.bottoms._id)}>Switch!</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card border p-4">
                                        <div className="row d-flex align-items-center">
                                            <div className="col col-12">
                                                <h6>{outfit.footwear.category} from {outfit.footwear.brand}</h6>
                                                <button className="btn btn-primary" onClick={() => switchItem(outfit.footwear.type, outfit.footwear._id)}>Switch!</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                            <div className="row outfit-save mt-5">
                                <div className="col-12">
                                    {errorMessage && <p>{errorMessage}</p>}
                                    <button className="btn btn-primary btn-lg mx-2" onClick={handleSave}>Save Outfit</button>
                                    <button className="btn btn-danger btn-lg mx-2" onClick={handleDelete}>Delete Outfit</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <OutfitCard outfit={outfit} type={outfit.type} />
                        </div>
                    </div>
                </>
            }

        </div>
    );
}

export default ViewOutfit;