function StyleCard(props) {

    const { style } = props;

    return (

        <div className="card d-inline-flex mx-3 my-3" style={{ minWidth: "15%" }}>
            <div className="card-body">
                <h4 className="card-title pb-3 text-capitalize">{style.name} ({style.items.length})</h4>
                {style.images.map(img => <img src={img} alt={`${style.name}-item`} key={style.name} width="60px" height="auto" style={{ display: "inline-block" }} />)}
            </div>
        </div>
    )
}

export default StyleCard;