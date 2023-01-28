function OutfitCard(props) {

    const { outfit } = props;

    return (
        <div className="card d-inline-flex mx-3 my-3 outfit-card" style={{ width: "25%" }}>
            <div className="card-body">
                {outfit.map(item => <img src={item.imageUrl} alt="item" width="150px" />)}
            </div>
        </div>
    );
}

export default OutfitCard;