function StyleCard(props) {

    const { style } = props;

    return (
        <div className="card mt-4 mb-2 card-body">
            <div className="card-body d-flex justify-content-between align-items-baseline">
                <h5 className="card-title pb-3 text-capitalize">{style.name}</h5><h5><span className="badge bg-info fw-normal">{style.items.length}</span></h5>
            </div>
            <div className="d-flex flex-wrap justify-content-start align-items-baseline">
                {style.images.map(img => <img src={img} alt={`${style.name}-item`} key={style.name} width="100px" height="auto" style={{ display: "inline-block" }} />)}
            </div>
        </div>
    )
}

export default StyleCard;