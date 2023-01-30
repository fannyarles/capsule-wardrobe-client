import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-hot-toast";

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
                    case 'One-Piece':
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

    return (
        <div id="view-outfit-page">
            {!outfitItems ?
                <Loader />
                :
                <>
                    <div className="row">
                        <div className="col-12">
                            {outfit.type === "onePiece" &&
                                <>
                                    <img src={outfit.piece.imageUrl} className={outfit.piece.type.toLowerCase()} alt="item" width="150px" />
                                    <img src={outfit.footwear.imageUrl} className={outfit.footwear.type.toLowerCase()} alt="item" width="150px" />
                                </>
                            }
                            {outfit.type === "twoPiece" &&
                                <div className="row justify-content-md-center">
                                    <div className="col col-2">
                                        <div className={"item " + outfitItems.top.type.toLowerCase()}>
                                            <img src={outfitItems.top.imageUrl} alt="item" />
                                            <div className="item-infos">
                                                <h4>{outfitItems.top.category} from {outfitItems.top.brand}</h4>
                                                <button className="btn btn-primary" onClick={() => switchItem(outfitItems.top.type, outfitItems.top._id)}>Switch!</button>
                                            </div>
                                        </div>
                                        <div className={"item " + outfitItems.footwear.type.toLowerCase()}>
                                            <img src={outfitItems.footwear.imageUrl} alt="item" />
                                            <div className="item-infos">
                                                <h4>{outfitItems.footwear.category} from {outfitItems.footwear.brand}</h4>
                                                <button className="btn btn-primary" onClick={() => switchItem(outfitItems.footwear.type, outfitItems.footwear._id)}>Switch!</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col col-2">
                                        <div className={"item " + outfitItems.bottoms.type.toLowerCase()}>
                                            <img src={outfitItems.bottoms.imageUrl} alt="item" />
                                            <div className="item-infos">
                                                <h4>{outfitItems.bottoms.category} from {outfitItems.bottoms.brand}</h4>
                                                <button className="btn btn-primary" onClick={() => switchItem(outfitItems.bottoms.type, outfitItems.bottoms._id)}>Switch!</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="row outfit-save">
                        <div className="col-12">
                            {errorMessage && <p>{errorMessage}</p>}
                            <button className="btn btn-primary" onClick={handleSave}>Save Outfit</button>
                        </div>
                    </div>
                </>
            }

        </div>
    );
}

export default ViewOutfit;