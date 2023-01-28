function CatCard(props) {

    const { cat } = props;

    return (

        <div className="card mx-3 my-3" style={{ minWidth: "23.6%" }}>
            <div className="card-body">
                <h4 className="card-title pb-3">{cat.name} ({cat.count})</h4>
                {cat.images.map(img => <img src={img} alt={`${cat.name}-item`} key={cat.name} width="120px" height="auto" style={{ display: "inline-block" }} />)}
            </div>
        </div>
    )
}

export default CatCard;