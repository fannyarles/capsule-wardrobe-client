import { Link } from "react-router-dom";

function ItemCard(props) {

    const { item } = props;
    const occasions = item.occasions.map(occasion => <span className="occasions-tags text-capitalize">{occasion} </span>);

    return (
        <div className="col col-3 text-start">
            <div className="card mt-4 mb-2">
                <div className="card-body">
                    <div style={{
                        backgroundImage: `url('${item.imageUrl}')`,
                        paddingBottom: "100%",
                        position: "relative",
                        backgroundSize: "contain",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat"
                    }}>
                    </div>
                    <div className="d-flex justify-content-between align-items-start py-3">
                        <div><p className="pb-0 mb-2"><span className="text-muted fw-light" style={{ letterSpacing: ".5px" }}>{item.category} from</span> <span className="fw-regular">{item.brand}</span></p><p className="mt-0 pt-0">{occasions}</p></div>
                        <Link to={`/dressing/item/edit/${item._id}`} className="btn btn-outline-secondary btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;