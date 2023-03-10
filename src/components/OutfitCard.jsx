function OutfitCard(props) {

    const { outfit, type } = props;

    return (
        <div className="card my-3 outfit-card d-flex justify-content-between">
            <div className="card-body">
                {type === "1" &&
                    <>
                        <div className="row d-flex justify-content-center">
                            <div className="col col-7 d-flex flex-column justify-content-center">
                                <img src={outfit.piece && outfit.piece.imageUrl} alt="item" width="100%" data-item-type={outfit.piece && outfit.piece.type} className="outfit-card-item" />
                            </div>
                            <div className="col col-5 d-flex flex-column justify-content-center">
                                <img src={outfit.footwear && outfit.footwear.imageUrl} alt="item" width="100%" data-item-type={outfit.footwear && outfit.footwear.type} className="outfit-card-item" />
                            </div>
                        </div>
                    </>
                }
                {type === "2" &&
                    <>
                        <div className="row d-flex justify-content-center">
                            <div className="col col-5 d-flex flex-column justify-content-center">
                                <img src={outfit.top && outfit.top.imageUrl} alt="item" width="100%" data-item-type={outfit.top && outfit.top.type} className="outfit-card-item" /><br />
                                <img src={outfit.footwear && outfit.footwear.imageUrl} alt="item" width="100%" data-item-type={outfit.footwear && outfit.footwear.type} className="outfit-card-item" />
                            </div>
                            <div className="col col-7 d-flex flex-column justify-content-center">
                                <img src={outfit.bottoms && outfit.bottoms.imageUrl} alt="item" width="100%" data-item-type={outfit.bottoms && outfit.bottoms.type} className="outfit-card-item" />
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default OutfitCard;