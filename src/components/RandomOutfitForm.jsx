import axios from "axios";
import { useState } from "react";
import { occasions } from '../data/itemsParams.data';

function RandomOutfitForm(props) {

    const { itemParams, setItemParams, setOutfits } = props;
    const [errorMessage, setErrorMessage] = useState('');

    const selectOccasion = e => {
        const value = e.target.getAttribute('data-outfit-occasion');
        document.querySelectorAll("p.occasion").forEach(el => { if (el.classList.contains("selected")) { el.classList.remove("selected") } });
        e.target.classList.add("selected");
        setItemParams({ ...itemParams, occasion: value });
    }

    const selectType = e => {
        if (e.target.classList.contains("selected")) {
            e.target.classList.remove("selected");
            setItemParams({ ...itemParams, category: '', pieceItem: '' });
        } else {
            const value = e.target.getAttribute('data-outfit-category');
            document.querySelectorAll("p.category").forEach(el => {
                if (el.classList.contains("selected")) { el.classList.remove("selected") };
            });
            e.target.classList.add("selected");
            document.querySelectorAll('[data-outfit-item=""]').forEach(el => el.classList.add("selected"));
            setItemParams({ ...itemParams, category: value, pieceItem: '' });

        }
    }

    const selectPieceItem = e => {
        const value = e.target.getAttribute('data-outfit-item');
        document.querySelectorAll("p.pieceItem").forEach(el => {
            if (el.classList.contains("selected")) { el.classList.remove("selected") };
        });
        e.target.classList.add("selected");
        setItemParams({ ...itemParams, pieceItem: value });
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/outfits/random/`, itemParams)
            .then(response => setOutfits(response.data))
            .catch(err => setErrorMessage(err.response.data.message))
    }

    return (<>
        <h1>Generate random outfit</h1>

        <p>Select parameters</p>

        <form onSubmit={handleSubmit} id="random-generator-form">
            <label htmlFor="category">Category</label><br />
            <p data-outfit-category="" className="category selected" onClick={selectType}>Any</p>
            <p data-outfit-category="twoPiece" className="category" onClick={selectType}>Top / Bottoms</p>
            <p data-outfit-category="onePiece" className="category" onClick={selectType}>One-piece</p><br />
            {itemParams.category === "twoPiece" &&
                <>
                    <p data-outfit-item="" className="pieceItem selected" onClick={selectPieceItem}>Any</p>
                    <p data-outfit-item="skirt" className="pieceItem" onClick={selectPieceItem}>Skirt</p>
                    <p data-outfit-item="pants" className="pieceItem" onClick={selectPieceItem}>Pants</p>
                </>
            }
            {itemParams.category === "onePiece" &&
                <>
                    <p data-outfit-item="" className="pieceItem selected" onClick={selectPieceItem}>Any</p>
                    <p data-outfit-item="dress" className="pieceItem" onClick={selectPieceItem}>Dress</p>
                    <p data-outfit-item="pantsuit" className="pieceItem" onClick={selectPieceItem}>Pantsuit</p>
                </>
            }
            <br /><br />
            <label htmlFor="occasions">Occasion</label><br />
            <p data-outfit-occasion="" className="occasion selected" onClick={selectOccasion}>Any</p>
            {occasions.map(el => <p data-outfit-occasion={el.value} key={el.value} onClick={selectOccasion} className="occasion">{el.name}</p>)}

            <br /><br />

            <input type="submit" value="Generate outfit" />
        </form>

    </>
    );

}

export default RandomOutfitForm;