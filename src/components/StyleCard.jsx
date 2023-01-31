function StyleCard(props) {

    const { style } = props;

    return (
        <div className="col col-3 text-start">
            <div className="card mt-4 mb-2">
                <div className="card-body">
                    <div className="card-body d-flex justify-content-between align-items-baseline">
                        <h5 className="card-title pb-3 text-capitalize">{style.name}</h5><h5><span className="badge bg-info fw-normal">{style.items.length}</span></h5>
                    </div>
                    {style.images.map(img => <img src={img} alt={`${style.name}-item`} key={style.name} width="120px" height="auto" style={{ display: "inline-block" }} />)}
                </div>
            </div>
        </div>
    )
}

export default StyleCard;