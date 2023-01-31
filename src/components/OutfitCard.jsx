import { Link } from "react-router-dom";

function OutfitCard(props) {

    const { from, occasion, outfit, type } = props;

    return (
        <div className="card mx-3 my-3 outfit-card d-flex justify-content-between">
            <div className="card-body">
                {type === "onePiece" &&
                    <>
                        <div className="row">
                            <div className="col col-7 d-flex flex-column justify-content-center">
                                <img src={outfit.piece.imageUrl} alt="item" width="100%" />
                            </div>
                            <div className="col col-5 d-flex flex-column justify-content-center">
                                <img src={outfit.footwear.imageUrl} alt="item" width="100%" />
                            </div>
                        </div>
                    </>
                }
                {type === "twoPiece" &&
                    <>
                        <div className="row">
                            <div className="col col-5 d-flex flex-column justify-content-center">
                                <img src={outfit.top.imageUrl} alt="item" width="100%" /><br />
                                <img src={outfit.footwear.imageUrl} alt="item" width="100%" />
                            </div>
                            <div className="col col-7 d-flex flex-column justify-content-center">
                                <img src={outfit.bottoms.imageUrl} alt="item" width="100%" />
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default OutfitCard;