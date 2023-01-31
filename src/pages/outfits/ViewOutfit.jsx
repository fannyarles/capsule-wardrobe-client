import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-hot-toast";
import OutfitCard from "../../components/OutfitCard";

function ViewOutfit() {

    const navigate = useNavigate();
    const location = useLocation();

    const storedToken = localStorage.getItem('authToken');

    const { occasion, outfit } = location.state;
    const [outfitItems, setOutfitItems] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const switchItem = (itemType, currentItemId) => {
        const loadingToast = toast.loading('Waiting...');
        axios.get(`http://localhost:5005/dressing/switch/${occasion}/${itemType}/${currentItemId}`, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(response => {

                if (!response.data) {
                    toast.dismiss(loadingToast);
                    toast.error(`No more ${occasion} ${itemType.toLowerCase()} in your dressing.`);
                    return;
                }

                switch (itemType) {
                    case 'Tops':
                        setOutfitItems({ ...outfitItems, top: response.data });
                        break;
                    case 'Bottoms':
                        setOutfitItems({ ...outfitItems, bottoms: response.data });
                        break;
                    case 'Footwear':
                        setOutfitItems({ ...outfitItems, footwear: response.data });
                        break;
                    case 'One-Pieces':
                        setOutfitItems({ ...outfitItems, piece: response.data });
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

        const loadingToast = toast.loading('Waiting...');

        let savedOutfit = {};
        if (outfit.type === 'onePiece') { savedOutfit = { occasion: occasion, type: outfit.type, footwear: outfitItems.footwear._id, piece: outfitItems.piece._id } }
        if (outfit.type === 'twoPiece') { savedOutfit = { occasion: occasion, type: outfit.type, footwear: outfitItems.footwear._id, top: outfitItems.top._id, bottoms: outfitItems.bottoms._id } }

        const saveOutfit = axios.post(`http://localhost:5005/outfits/save`, savedOutfit, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(() => {
                toast.dismiss(loadingToast);
                toast.success('Item switched!');
                navigate('/outfits/saved')
            })
            .catch(err => {
                setErrorMessage(err.response.data.message)
                toast.dismiss(loadingToast);
                toast.error(err.response.data.message);
            });

    }

    useEffect(() => {
        if (outfit.type === 'twoPiece') {
            setOutfitItems({ ...outfitItems, top: outfit.top, bottoms: outfit.bottoms, footwear: outfit.footwear });
        } else if (outfit.type === 'onePiece') {
            setOutfitItems({ ...outfitItems, piece: outfit.piece, footwear: outfit.footwear });
        }
    }, [outfit])

    return (<>
        {
            !outfit || !outfitItems ?
                <Loader />
                :
                <>
                    <div className="row d-flex text-start align-items-start justify-content-start my-3">
                        <div className="col-3 d-flex flex-column justify-content-between">
                            <div>
                                <h1>View outfit</h1>
                                <p className="occasions-tags">{occasion}</p>

                                {outfit.type === "onePiece" &&
                                    <>
                                        <div className="card border p-4 mb-4">
                                            <div className="row d-flex align-items-center">
                                                <div className="col col-12">
                                                    <h6>{outfitItems.piece.category} from {outfitItems.piece.brand}</h6>
                                                    <button className="btn btn-primary" onClick={() => switchItem(outfitItems.piece.type, outfitItems.piece._id)}>Switch!</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card border p-4">
                                            <div className="row d-flex align-items-center">
                                                <div className="col col-12">
                                                    <h6>{outfitItems.footwear.category} from {outfitItems.footwear.brand}</h6>
                                                    <button className="btn btn-primary" onClick={() => switchItem(outfitItems.footwear.type, outfitItems.footwear._id)}>Switch!</button>
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
                            </div>
                            <div className="mt-5">
                                {errorMessage && <p>{errorMessage}</p>}
                                <button className="btn btn-primary btn-lg" onClick={handleSave}>Save Outfit</button>
                            </div>
                        </div>
                        <div className="col-6">
                            <OutfitCard outfit={outfitItems} type={outfit.type} />
                        </div>
                    </div>
                </>
        }
    </>);
}

export default ViewOutfit;