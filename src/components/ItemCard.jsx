import { Link } from "react-router-dom";

function ItemCard(props) {

    const { item } = props;
    const occasions = item.occasions.map(occasion => <span className="occasions-tags text-capitalize">{occasion} </span>);

    return (<>
        <div className="save-outfit-card d-flex align-items-baseline">
            <div className="card-actions">
                <div className="edit-outfit-icon me-3">
                    <Link to={`/outfits/view/${item._id}`}>
                        <i class="bi bi-arrow-repeat"></i>
                    </Link>
                </div>
                <p>{occasions}</p>
            </div>

            <div className="card mt-4 mb-2 card-body">
                <Link to={`/dressing/item/edit/${item._id}`}>
                    <div className="outfit-card" style={{
                        backgroundImage: `url('${item.imageUrl}')`,
                        width: "100%",
                        paddingBottom: "100%",
                        position: "relative",
                        backgroundSize: "contain",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat"
                    }}>
                    </div>
                </Link>

                <div className="d-flex justify-content-between align-items-start py-3">
                    <div>
                        <p className="pb-0 mb-1">
                            <span className="text-muted fw-light" style={{ letterSpacing: ".5px" }}>{item.category} from</span> <span className="fw-regular">{item.brand}</span>
                        </p>

                        <p className="text-muted fst-italic mt-0 pt-0"><small>Used in {item.outfits.length ? item.outfits.length : "0"} outfits</small></p>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default ItemCard;