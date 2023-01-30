import { useLocation } from "react-router-dom";
import OutfitCard from "../../components/OutfitCard";
import Loader from "../../components/Loader";

function RandomOutfits() {

    const location = useLocation();
    const { results } = location.state;
    console.log(results)

    return (<>

        {!results ? <Loader /> :
            <>
                <h1>{results.outfits.length} outfits generated</h1>
                <p className="text-capitalize">{results.occasion}</p>
                <div className="d-inline-flex">
                    {results.outfits.map(outfit => <OutfitCard occasion={results.occasion} outfit={outfit} />)}
                </div>
            </>
        }

    </>
    );
}

export default RandomOutfits;