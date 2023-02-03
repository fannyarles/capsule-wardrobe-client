import { useContext, useEffect, useState, CSSProperties } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context.js";
import dressingApi from "../../services/DressingApi.service.js";
import CatCard from "../../components/CatCard";
import ItemCard from "../../components/ItemCard";
import StyleCard from "../../components/StyleCard";
import Loader from "../../components/Loader";


function Dressing() {

    const storedToken = localStorage.getItem('authToken');

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
                if (displayedInfos[catIdx].images.length < 6) { displayedInfos[catIdx].images.push(item.imageUrl) }
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
            if (item.occasions.includes("casual")) { itemsByStyle[0].items.push(item); if (itemsByStyle[0].images.length < 12) itemsByStyle[0].images.push(item.imageUrl); }
            if (item.occasions.includes("formal")) { itemsByStyle[1].items.push(item); if (itemsByStyle[1].images.length < 12) itemsByStyle[1].images.push(item.imageUrl); }
            if (item.occasions.includes("business")) { itemsByStyle[2].items.push(item); if (itemsByStyle[2].images.length < 12) itemsByStyle[2].images.push(item.imageUrl); }
            if (item.occasions.includes("sportswear")) { itemsByStyle[3].items.push(item); if (itemsByStyle[3].images.length < 12) itemsByStyle[3].images.push(item.imageUrl); }
        })

        return itemsByStyle;
    }

    const filterData = (e) => {
        if (e.target.value === '') { setFilteredData(null); return; }
        setDisplay('item');
        setFilteredData([...dressingByItems].filter(item => item.brand.toLowerCase().includes(e.target.value.toLowerCase()) || item.category.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    useEffect(() => {
        if (user?.id) {
            axios.get(`${process.env.REACT_APP_API_URL}/dressing/user/${user.id}`, { headers: { "Authorization": `Bearer ${storedToken}` } })
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


    return (
        <div className="row text-start">
            <div className="col col-12 mb-5">
                <h1>Dressing</h1>
            </div>


            {loading ? <Loader /> :
                <>

                    <div className="col col-12">
                        <div className="row my-2 mb-5 align-items-center d-flex flex-column-reverse flex-xl-row flex-lg-column-reverse flex-md-column-reverse flex-sm-column-reverse flex-xs-column-reverse flex-xxs-column-reverse">
                            <div className="col col-12 col-xxl-5 col-xl-3 col-lg-12 col-md-12 col-sm-12 col-xs-12 text-start align-self-center">
                                {display === 'item' && <p className="mb-0 pb-0">{dressingByItems.length} items</p>}
                                {display === 'category' && <p className="mb-0 pb-0"> categories</p>}
                                {display === 'style' && <p className="mb-0 pb-0">{dressingByItems.length} items</p>}
                            </div>
                            <div className="col col-12 col-xxl-7 col-xl-9 col-lg-12 col-md-12 col-sm-12 col-xs-12 text-start mb-xl-0 mb-lg-4 mb-md-4 mb-sm-4 mb-xs-4 mb-xxs-4">
                                <div className="row">
                                    <div className="col col-12 col-xxl-6 col-xl-6 col-md-6 col-sm-6 col-xs-12 col-xxs-12 d-flex flex-nowrap flex-column flex-xl-row flex-lg-row flex-md-row flex-sm-row flex-xs-column-reverse flex-xxs-column-reverse align-content-baseline mb-3 mb-xs-0 mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0">
                                        <label htmlFor="filter-by" className="mt-0 pb-0 pt-1" style={{ minWidth: "100px" }}>Filter by</label>
                                        <select id="filter-by" className="form-select py-3" aria-label="Filter by" value={display} onChange={e => setDisplay(e.target.value)}>
                                            <option value="item">Items</option>
                                            <option value="category">Categories</option>
                                            <option value="style">Styles</option>
                                        </select>
                                    </div>
                                    <div className="col col-12 col-xxl-6 col-xl-6 col-md-6 col-sm-6 col-xs-12 col-xxs-12  mb-3 mb-xs-0 mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0">
                                        <div className="input-group">
                                            <input className="form-control border-end-0 border py-3 ps-4" type="search" placeholder="Search items by category or brand" id=" example-search-input" onChange={filterData} />
                                            <span className="input-group-append">
                                                <button className="btn btn-outline-secondary bg-white border-start-0 border-bottom border ms-n5 py-3 px-4" type="button">
                                                    <i className="fa fa-search"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col col-12">
                        <div className="row d-flex flex-wrap flex-row">
                            {!filteredData ?
                                <>
                                    {display === 'item' && dressingByItems.map(item => {
                                        return <div className="col col-12 col-xxl-4 col-xl-6 col-md-6rt">
                                            <ItemCard key={item._id} item={item} />
                                        </div>
                                    })}
                                    {display === 'category' && dressingByCategories.map(cat => {
                                        return <div className="col col-12 col-xxl-3 col-xl-6 col-lg-12 col-md-12 text-start">
                                            <CatCard key={cat.id} cat={cat} />
                                        </div>
                                    })}
                                    {display === 'style' && dressingByStyles.map(style => {
                                        return <div className="col col-12 col-xxl-6 col-xl-6 col-lg-12 col-md-12 text-start">
                                            <StyleCard key={style.id} style={style} />
                                        </div>
                                    })}
                                </>
                                :
                                <>
                                    {filteredData.map(item => {
                                        return <div className="col col-12 col-xxl-4 col-xl-6 col-md-6 text-start">
                                            <ItemCard key={item._id} item={item} />
                                        </div>
                                    })}
                                    {!filteredData.length && <p className="mt-5 text-muted text-start">No results match this search.</p>}
                                </>
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default Dressing;