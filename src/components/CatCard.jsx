function CatCard(props) {

    const { cat } = props;

    return (
        <div className="card mt-4 mb-2 card-body">
            <div className="card-body d-flex justify-content-between align-items-baseline">
                <h5 className="card-title pb-3">{cat.name}</h5><h5><span className="badge bg-info fw-normal">{cat.count}</span></h5>
            </div>
            <div className="card-body d-flex justify-content-start flex-wrap align-items-baseline">
                {cat.images.map(img => <img src={img} alt={`${cat.name}-item`} key={cat.name} width="80px" height="auto" style={{ display: "inline-block" }} />)}
            </div>
        </div>
    )
}

export default CatCard;