function StyleCard(props) {

    const { style } = props;

    return (

        <div className="card mx-3 my-3" style={{ width: "48.6%" }}>
            <div className="card-body">
                <h4 className="card-title pb-3 text-capitalize">{style.name} ({style.items.length})</h4>
                {style.images.map(img => <img src={img} alt={`${style.name}-item`} key={style.name} width="120px" height="auto" style={{ display: "inline-block" }} />)}
            </div>
        </div>
    )
}

export default StyleCard;