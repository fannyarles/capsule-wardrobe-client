import { Link } from "react-router-dom";

function ItemCard(props) {

    const { item } = props;
    const occasions = item.occasions.map(occasion => <span className="occasions-list-item text-capitalize">{occasion}</span>);

    return (
        <div className="card d-inline-flex mx-3 my-3" style={{ minWidth: "15%" }}>
            <div className="card-body">
                <img src={item.imageUrl} alt={`${item.category}-item`} key={item._id} width="120px" height="auto" style={{ display: "inline-block" }} />
                <h4 className="card-title pt-3">{item.category}</h4>
                <p>{occasions}</p>
                <p>{item.brand}</p>
                <Link to={`/dressing/item/edit/${item._id}`}>Edit item</Link>
            </div>
        </div>
    );
}

export default ItemCard;