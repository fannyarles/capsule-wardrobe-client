import { Link } from "react-router-dom";

function OutfitCard(props) {

    const { from, occasion, outfit, type } = props;

    return (
        <div className="card my-3 outfit-card d-flex justify-content-between">
            <div className="card-body">
                {type === "1" &&
                    <>
                        <div className="row d-flex justify-content-center">
                            <div className="col col-7 d-flex flex-column justify-content-center">
                                <img src={outfit.piece.imageUrl} alt="item" width="100%" data-item-type={outfit.piece.type} />
                            </div>
                            <div className="col col-5 d-flex flex-column justify-content-center">
                                <img src={outfit.footwear.imageUrl} alt="item" width="100%" data-item-type={outfit.footwear.type} />
                            </div>
                        </div>
                    </>
                }
                {type === "2" &&
                    <>
                        <div className="row d-flex justify-content-center">
                            <div className="col col-5 d-flex flex-column justify-content-center">
                                <img src={outfit.top.imageUrl} alt="item" width="100%" data-item-type={outfit.top.type} /><br />
                                <img src={outfit.footwear.imageUrl} alt="item" width="100%" data-item-type={outfit.footwear.type} />
                            </div>
                            <div className="col col-7 d-flex flex-column justify-content-center">
                                <img src={outfit.bottoms.imageUrl} alt="item" width="100%" data-item-type={outfit.bottoms.type} />
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default OutfitCard;