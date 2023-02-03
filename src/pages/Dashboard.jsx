import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import UserApi from './../services/UserApi.services';

function Dashboard() {

    const { isUserLoading, isLoggedIn, user } = useContext(AuthContext);

    const storedToken = localStorage.getItem('authToken');
    const navigate = useNavigate();

    const [topItems, setTopItems] = useState(null);
    const [topOutfitCat, setTopOutfitCat] = useState(null);

    const [occasion, setOccasion] = useState('formal');
    const [category, setCategory] = useState('any');
    const [piece, setPiece] = useState('any');

    const [errorMessage, setErrorMessage] = useState(null);

    const setCatAndPiece = value => {
        if (value === 'any') { setCategory('any'); setPiece(value); }
        if (value === 'Dress' || value === 'Pantsuit') { setCategory('1'); setPiece(value); }
        if (value === 'Skirt' || value === 'Pants') { setCategory('2'); setPiece(value); }
    }
    const handleSubmit = e => {
        e.preventDefault();
        navigate(`/outfits/random/view/?occasion=${occasion}&cat=${category}&piece=${piece}`)
    }
    if (topOutfitCat) console.log(topOutfitCat)

    useEffect(() => {
        UserApi.getTop5Items()
            .then(response => setTopItems(response))
            .catch(err => setErrorMessage(err.reponse.data.message));
    }, [isUserLoading])

    useEffect(() => {
        UserApi.getTop5Cats()
            .then(response => setTopOutfitCat(response))
            .catch(err => setErrorMessage(err.reponse.data.message));
        if (topOutfitCat) console.logt(topOutfitCat)
    }, [isUserLoading])

    return <>
        <div className="row text-start">
            <div className="col col-12 mb-4">
                <form onSubmit={handleSubmit}>
                    <h1>{!isUserLoading && <>Welcome, {user.username}.</>}</h1>
                    <h5 className="mt-4">{!isUserLoading && <>Jumpstart your day, save brain power:</>}</h5>
                    <div className="d-flex align-items-baseline mt-4 flex-wrap">
                        <p>I need a</p>
                        <select id="filter-by" className="py-2 d-inline mx-3" aria-label="Filter by" value={occasion} onChange={e => setOccasion(e.target.value)}>
                            <option value="casual">casual</option>
                            <option value="formal">formal</option>
                            <option value="business">business</option>
                            <option value="sportswear">sportswear</option>
                        </select>
                        <p>outfit, with</p>
                        <select id="filter-by" className="py-2 d-inline mx-3" aria-label="Filter by" value={piece} onChange={e => setCatAndPiece(e.target.value)}>
                            <option value="any">any pieces.</option>
                            <option value="Dress">a dress.</option>
                            <option value="Pantsuit">a pantsuit.</option>
                            <option value="Pants">some pants.</option>
                            <option value="Skirt">a skirt.</option>
                        </select>
                        <button className="btn btn-primary">Let's go!</button>
                    </div>
                </form>
            </div>
            <div className="col col-12 mb-4">
                <hr />
            </div>
        </div>
        <div className="row text-start">
            <div className="col col-12 col-xxl-4 col-xl-6 mb-4">
                <div className="card">
                    <h6 className="mb-4">Top 5 used items</h6>
                    {topItems && <>
                        {!topItems.length ? <p className="text-muted"><small>No items yet.</small></p>
                            : topItems.map(item => {
                                return (
                                    <div key={item._id} className="row d-flex align-items-center mb-3">
                                        <div className="col col-3">
                                            <div style={{
                                                backgroundImage: `url("${item.imageUrl}")`,
                                                backgroundSize: "contain",
                                                backgroundPosition: "center center",
                                                backgroundRepeat: "no-repeat",
                                                width: "100%",
                                                paddingTop: "100%"
                                            }}></div>
                                        </div>
                                        <div className="col col-9">
                                            <p className="pb-0 mb-2">
                                                <span className="text-muted fw-light" style={{ letterSpacing: ".5px" }}>{item.category} from</span> <span className="fw-regular">{item.brand}</span>
                                            </p>
                                            <p className="mt-0 pt-0">Used in {item.outfits.length ? item.outfits.length : "0"} {item.outfits.length === 1 ? "outfit" : "outfits"}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </>}
                </div>
            </div>
            <div className="col col-12 col-xxl-3 col-xl-6">
                <div className="card ">
                    <h6 className="mb-4">Top outfits categories</h6>
                    {topOutfitCat &&
                        topOutfitCat.map((cat) => {
                            return (
                                <div key={cat._id} className="row d-flex align-items-center mb-3">
                                    <div className="col col-6 d-flex align-items-baseline">
                                        <p className="occasions-tags">{cat.name}</p>
                                    </div>
                                    <div className="col col-6 d-flex align-items-baseline justify-content-end text-end">
                                        <p>{cat.count} {cat.count === 1 ? "outfit" : "outfits"}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>

    </>

}

export default Dashboard;