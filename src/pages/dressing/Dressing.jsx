import { useContext, useEffect, useState, CSSProperties } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context.js";
import dressingApi from "../../services/DressingApi.service.js";
import CatCard from "../../components/CatCard";
import ItemCard from "../../components/ItemCard";
import StyleCard from "../../components/StyleCard";
import Loader from "../../components/Loader";


function Dressing() {

    const { isUserLoading, isLoggedIn, user } = useContext(AuthContext);
    const [dressingByItems, setDressingByItems] = useState(null);
    const [dressingByCategories, setDressingByCategories] = useState([]);
    const [dressingByStyles, setDressingByStyles] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [display, setDisplay] = useState('item');

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    const filterCategories = (list) => {
        let displayedInfos = [];

        list.map(item => {
            const catIdx = displayedInfos.findIndex(el => el.name === item.category);
            if (catIdx >= 0) {
                displayedInfos[catIdx].count++
                if (displayedInfos[catIdx].images.length < 4) { displayedInfos[catIdx].images.push(item.imageUrl) }
            } else {
                displayedInfos.push({ id: Math.floor(Math.random() * 100), name: item.category, count: 1, images: [item.imageUrl] });
            }
        })

        return displayedInfos;
    }

    const filterStyles = (list) => {
        const itemsByStyle = [
            { id: 1, name: "casual", items: [], images: [] },
            { id: 2, name: "formal", items: [], images: [] },
            { id: 3, name: "business", items: [], images: [] },
            { id: 4, name: "sportswear", items: [], images: [] }
        ];

        list.map(item => {
            if (item.occasions.includes("casual")) { itemsByStyle[0].items.push(item); if (itemsByStyle[0].images.length < 8) itemsByStyle[0].images.push(item.imageUrl); }
            if (item.occasions.includes("formal")) { itemsByStyle[1].items.push(item); if (itemsByStyle[1].images.length < 8) itemsByStyle[1].images.push(item.imageUrl); }
            if (item.occasions.includes("business")) { itemsByStyle[2].items.push(item); if (itemsByStyle[2].images.length < 8) itemsByStyle[2].images.push(item.imageUrl); }
            if (item.occasions.includes("sportswear")) { itemsByStyle[3].items.push(item); if (itemsByStyle[3].images.length < 8) itemsByStyle[3].images.push(item.imageUrl); }
        })

        return itemsByStyle;
    }

    const filterData = (e) => {
        if (e.target.value === '') { setFilteredData(null); return; }
        setFilteredData([...dressingByItems].filter(item => item.brand.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    useEffect(() => {
        if (user?.id) {
            axios.get(`http://localhost:5005/dressing/user/${user.id}`)
                .then(response => setDressingByItems(response.data))
                .catch(err => console.error(err))
        }
    }, [user]);

    useEffect(() => {
        if (dressingByItems) {
            const filteredData = filterCategories(dressingByItems);
            setDressingByCategories(filteredData);
        }
    }, [dressingByItems]);

    useEffect(() => {
        if (dressingByItems) {
            const filteredData = filterStyles(dressingByItems);
            setDressingByStyles(filteredData);
        }
    }, [dressingByItems]);

    useEffect(() => {
        if (dressingByItems && dressingByStyles) {
            setLoading(false)
        }
    }, [dressingByItems, dressingByStyles]);


    return <div>

        <h1>Dressing</h1>

        {loading ? <Loader /> :
            <>
                <div className="filters my-4">
                    <button className="mx-2" onClick={() => setDisplay('item')}>Display all items</button>
                    <button className="mx-2" onClick={() => setDisplay('category')}>Display categories</button>
                    <button className="mx-2" onClick={() => setDisplay('style')}>Display styles</button>
                    {display === 'item' && <input type="search" placeholder={`Search by ${display}`} onChange={filterData} />}
                </div>

                <div className="dressing-items d-flex flex-wrap">
                    {!filteredData ?
                        <>
                            {display === 'item' && dressingByItems.map(item => <ItemCard key={item._id} item={item} />)}
                            {display === 'category' && dressingByCategories.map(cat => <CatCard key={cat.id} cat={cat} />)}
                            {display === 'style' && dressingByStyles.map(style => <StyleCard key={style.id} style={style} />)}
                        </>
                        :
                        <>
                            {display === 'item' && filteredData.map(item => <ItemCard key={item._id} item={item} />)}
                        </>
                    }
                </div>
            </>
        }
    </div>
}

export default Dressing;