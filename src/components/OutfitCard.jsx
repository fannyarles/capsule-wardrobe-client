import { Link } from "react-router-dom";

function OutfitCard(props) {

    const { outfit } = props;

    return (
        <div className="card mx-3 my-3 outfit-card" style={{ width: "25%" }}>
            <div className="card-body">
                {outfit.map(item => <img src={item.imageUrl} alt="item" width="150px" />)}
                <Link to='/outfits/single/view' state={{ outfit: outfit }} className="btn btn-primary">View / Edit Outfit</Link>
            </div>
        </div>
    );
}

export default OutfitCard;