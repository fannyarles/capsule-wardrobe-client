import { Link, useLocation } from "react-router-dom";
import OutfitCard from "../../components/OutfitCard";
import Loader from "../../components/Loader";

function RandomOutfits() {

    const location = useLocation();
    const { results } = location.state;
    console.log(results)

    return (<>
        <div className="row text-start">
            <div className="col col-12">

                {!results && <Loader />}

                {results &&
                    <>
                        <div className="row mb-4">
                            <div className="col col-12">
                                <h1>Matching Outfits <span className="badge bg-info fw-normal">{results.outfits.length}</span></h1>
                                <p className="text-capitalize occasions-tags">{results.occasion}</p>
                            </div>
                        </div>


                        {!results.outfits.length &&
                            <div className="row d-inline-flex">
                                <p>No outfits fit your search.</p>
                                <Link to='/outfits/random' className="btn btn-primary">Back to search</Link>
                            </div>
                        }


                        <div className="row d-flex flex-wrap">
                            {results.outfits.map(outfit => {
                                return <>
                                    <div className="col col-4 d-flex align-content-stretch">
                                        <div className="save-outfit-button">
                                            <Link to='/outfits/random/view/single' state={{ occasion: results.occasion, outfit: outfit }} className="btn btn-outline-warning">❤️</Link>
                                        </div>
                                        <OutfitCard occasion={results.occasion} outfit={outfit} type={outfit.type} />
                                    </div>
                                </>
                            })}
                        </div>
                    </>
                }

            </div>
        </div>
    </>
    );
}

export default RandomOutfits;