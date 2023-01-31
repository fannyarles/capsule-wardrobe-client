import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { occasionsData } from '../../data/itemsParams.data';

function RandomOutfit() {

    const navigate = useNavigate();

    const [itemParams, setItemParams] = useState({ category: '', pieceItem: '', occasion: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const selectOccasion = e => setItemParams({ ...itemParams, occasion: e.target.getAttribute('data-outfit-occasion') });

    const selectType = e => {
        const value = e.target.getAttribute('data-outfit-category');
        setItemParams({ ...itemParams, category: value, pieceItem: '' });
    }

    const selectPieceItem = e => setItemParams({ ...itemParams, pieceItem: e.target.getAttribute('data-outfit-item') });

    const handleSubmit = e => {
        e.preventDefault();

        if (itemParams.occasion === '') { setErrorMessage(`Occasion is required`); return; }

        axios.post(`http://localhost:5005/outfits/random/`, itemParams)
            .then(response => navigate('/outfits/random/view', { state: { results: response.data } }))
            .catch(err => setErrorMessage(err.response.data.message))

    }

    return (<>

        <div className="row mb-4 text-start pt-0">
            <div className="col col-12">
                <h1>Generate random outfit</h1>
            </div>
        </div>
        <div className="row mb-4 text-start">
            <div className="col col-12">

                <p className="text-muted fw-light">Select parameters below to create your outfit.</p>

                {errorMessage && <p className="alert alert-danger d-inline-flex" role="alert">{errorMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="row mb-4">
                        <div className="col col-12">

                            <label htmlFor="occasions">Occasion <span className="required">(Required)</span></label><br />
                            {occasionsData.map(el => <p data-outfit-occasion={el.value} key={el.value} onClick={selectOccasion} className={itemParams.occasion === el.value ? "occasion btn btn-info mx-1" : "occasion btn btn-outline-info mx-1"}>{el.name}</p>)}
                            <br />

                            <label htmlFor="category">Category</label><br />
                            <p data-outfit-category="" className={itemParams.category === "" ? "category btn btn-info mx-1" : "category btn btn-outline-info mx-1"} onClick={selectType}>Any</p>
                            <p data-outfit-category="twoPiece" className={itemParams.category === "twoPiece" ? "category btn btn-info mx-1" : "category btn btn-outline-info mx-1"} onClick={selectType}>Top / Bottoms</p>
                            <p data-outfit-category="onePiece" className={itemParams.category === "onePiece" ? "category btn btn-info mx-1" : "category btn btn-outline-info mx-1"} onClick={selectType}>One-piece</p><br />
                            {itemParams.category === "twoPiece" &&
                                <>
                                    <p data-outfit-item="" className={itemParams.pieceItem === "" ? "pieceItem btn btn-info mx-1" : "pieceItem btn btn-outline-info mx-1"} onClick={selectPieceItem}>Any</p>
                                    <p data-outfit-item="Skirt" className={itemParams.pieceItem === "Skirt" ? "pieceItem btn btn-info mx-1" : "pieceItem btn btn-outline-info mx-1"} onClick={selectPieceItem}>Skirt</p>
                                    <p data-outfit-item="Pants" className={itemParams.pieceItem === "Pants" ? "pieceItem btn btn-info mx-1" : "pieceItem btn btn-outline-info mx-1"} onClick={selectPieceItem}>Pants</p>
                                </>
                            }
                            {itemParams.category === "onePiece" &&
                                <>
                                    <p data-outfit-item="" className={itemParams.pieceItem === "" ? "pieceItem btn btn-info mx-1" : "pieceItem btn btn-outline-info mx-1"} onClick={selectPieceItem}>Any</p>
                                    <p data-outfit-item="Dress" className={itemParams.pieceItem === "Dress" ? "pieceItem btn btn-info mx-1" : "pieceItem btn btn-outline-info mx-1"} onClick={selectPieceItem}>Dress</p>
                                    <p data-outfit-item="Pantsuit" className={itemParams.pieceItem === "Pantsuit" ? "pieceItem btn btn-info mx-1" : "pieceItem btn btn-outline-info mx-1"} onClick={selectPieceItem}>Pantsuit</p>
                                </>
                            }
                        </div>
                    </div>
                    <div className="row mt-5 mb-4">
                        <div className="col col-12">
                            <input type="submit" value="Generate outfit" className="btn btn-lg btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </>
    );
}

export default RandomOutfit;