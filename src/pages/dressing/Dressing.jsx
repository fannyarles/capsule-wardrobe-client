import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context.js";
import dressingApi from "../../services/DressingApi.service.js";

function Dressing() {

    const { isUserLoading, isLoggedIn, user } = useContext(AuthContext);
    const [isDressingLoading, setIsDressingLoading] = useState(true);
    const [dressingItems, setDressingItems] = useState(null);
    const [displayedCategories, setDisplayedCategories] = useState([]);

    const filterCategories = (list) => {
        let displayedInfos = [];

        list.map(item => {
            const catIdx = displayedInfos.findIndex(el => el.name === item.type);
            if (catIdx >= 0) {
                displayedInfos[catIdx].count++
                if (displayedInfos[catIdx].images.length < 4) { displayedInfos[catIdx].images.push(item.imageUrl) }
            } else {
                displayedInfos.push({ name: item.type, count: 1, images: [item.imageUrl] });
            }
        })

        return displayedInfos;
    }

    useEffect(() => {
        if (user?.id) {
            axios.get(`http://localhost:5005/dressing/user/${user.id}`)
                .then(response => setDressingItems(response.data))
                .catch(err => console.error(err))
        }
    }, [user]);

    useEffect(() => {
        if (dressingItems) {
            const filteredData = filterCategories(dressingItems);
            setDisplayedCategories(filteredData);
        }
    }, [dressingItems]);


    return <div>
        {
            displayedCategories.map(cat => {
                return (
                    <div className="card d-inline-flex mx-3" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h4 className="card-title">{cat.name} ({cat.count})</h4>
                            {cat.images.map(img => <img src={img} alt={`${cat.name}-item`} key={cat.name} width="100px" height="auto" style={{ display: "inline-block" }} />)}
                        </div>
                    </div>
                )
            })
        }
    </div>
}

export default Dressing;