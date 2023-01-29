import { Link } from "react-router-dom";

function OutfitCard(props) {

    const { from, outfit } = props;

    return (
        <div className="card mx-3 my-3 outfit-card" style={{ width: "25%" }}>
            <div className="card-body">
                {outfit.type === "onePiece" &&
                    <>
                        <img src={outfit.piece.imageUrl} alt="item" width="150px" />
                        <img src={outfit.footwear.imageUrl} alt="item" width="150px" />
                    </>
                }
                {outfit.type === "twoPiece" &&
                    <>
                        <img src={outfit.top.imageUrl} alt="item" width="150px" />
                        <img src={outfit.bottoms.imageUrl} alt="item" width="150px" />
                        <img src={outfit.footwear.imageUrl} alt="item" width="150px" />
                    </>
                }
                {from === "savedOutfits" ?
                    <Link to='/outfits/single/view' state={{ outfit: outfit }} className="btn btn-primary"> Edit Outfit</Link>
                    :
                    <Link to='/outfits/single/view' state={{ outfit: outfit }} className="btn btn-primary">Save Outfit</Link>
                }
            </div>
        </div >
    );
}

export default OutfitCard;