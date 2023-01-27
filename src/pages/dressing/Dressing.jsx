import { useEffect } from "react";
import dressingApi from "../../services/DressingApi.service.js";

function Dressing() {

    useEffect(() => {
        const dressingItems = dressingApi.getDressing({ id: "123"});
        console.log(dressingItems)
    }, []);

    return <>
        test
    </>
}

export default Dressing;