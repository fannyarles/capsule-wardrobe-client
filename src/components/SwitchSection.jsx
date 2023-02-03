import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

function SwitchSection(props) {

    const { occasion, outfit, setOutfit } = props;
    const [errorMessage, setErrorMessage] = useState(null);

    const storedToken = localStorage.getItem('authToken');

    const focusOn = (element) => {
        const imgEl = document.querySelector(`img[data-item-type="${element}"]`);
        if (imgEl) imgEl.style.transform = 'scale(1.1)'
    }

    const focusOff = (element) => {
        const imgEl = document.querySelector(`img[data-item-type="${element}"]`);
        if (imgEl) imgEl.style.transform = 'scale(1)'
    }

    const switchItem = (itemType, currentItemId) => {
        const loadingToast = toast.loading('Waiting...');

        axios.get(`${process.env.REACT_APP_API_URL}/dressing/switch/${occasion}/${itemType}/${currentItemId}`, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(response => {

                if (!response.data) {
                    toast.dismiss(loadingToast);
                    toast.error(`No more ${occasion} ${itemType.toLowerCase()} in your dressing.`);
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

    return (<>
        {
            outfit.type === "1" &&
            <>
                <div className="card border p-4 mb-4 mt-3" onMouseOver={() => focusOn(outfit.piece.type)} onMouseOut={() => focusOff(outfit.piece.type)}>
                    <div className="row d-flex align-items-center">
                        <div className="col col-12 d-flex flex-md-row flex-sm-column justify-content-between align-items-baseline">
                            <h6 className="me-4">{outfit.piece.category} from {outfit.piece.brand}</h6>
                            <button className="btn btn-secondary" onClick={() => switchItem(outfit.piece.type, outfit.piece._id)}>Switch!</button>
                        </div>
                    </div>
                </div>
                <div className="card border p-4" onMouseOver={() => focusOn(outfit.footwear.type)} onMouseOut={() => focusOff(outfit.footwear.type)}>
                    <div className="row d-flex align-items-center">
                        <div className="col col-12 d-flex flex-md-row flex-sm-column justify-content-between align-items-baseline">
                            <h6 className="me-4">{outfit.footwear.category} from {outfit.footwear.brand}</h6>
                            <button className="btn btn-secondary" onClick={() => switchItem(outfit.footwear.type, outfit.footwear._id)}>Switch!</button>
                        </div>
                    </div>
                </div>
            </>
        }
        {
            outfit.type === "2" &&
            <>
                <div className="card border p-4 mb-4 mt-3" onMouseOver={() => focusOn(outfit.top.type)} onMouseOut={() => focusOff(outfit.top.type)}>
                    <div className="row d-flex align-items-center">
                        <div className="col col-12 d-flex flex-md-row flex-sm-column justify-content-between align-items-baseline">
                            <h6 className="me-4">{outfit.top.category} from {outfit.top.brand}</h6>
                            <button className="btn btn-secondary" onClick={() => switchItem(outfit.top.type, outfit.top._id)}>Switch!</button>
                        </div>
                    </div>
                </div>
                <div className="card border p-4 mb-4" onMouseOver={() => focusOn(outfit.bottoms.type)} onMouseOut={() => focusOff(outfit.bottoms.type)}>
                    <div className="row d-flex align-items-center">
                        <div className="col col-12 d-flex flex-md-row flex-sm-column justify-content-between align-items-baseline">
                            <h6 className="me-4">{outfit.bottoms.category} from {outfit.bottoms.brand}</h6>
                            <button className="btn btn-secondary" onClick={() => switchItem(outfit.bottoms.type, outfit.bottoms._id)}>Switch!</button>
                        </div>
                    </div>
                </div>
                <div className="card border p-4" onMouseOver={() => focusOn(outfit.footwear.type)} onMouseOut={() => focusOff(outfit.footwear.type)}>
                    <div className="row d-flex align-items-center">
                        <div className="col col-12 d-flex flex-md-row flex-sm-column justify-content-between align-items-baseline">
                            <h6 className="me-4">{outfit.footwear.category} from {outfit.footwear.brand}</h6>
                            <button className="btn btn-secondary" onClick={() => switchItem(outfit.footwear.type, outfit.footwear._id)}>Switch!</button>
                        </div>
                    </div>
                </div>
            </>
        }

    </>);

}

export default SwitchSection;