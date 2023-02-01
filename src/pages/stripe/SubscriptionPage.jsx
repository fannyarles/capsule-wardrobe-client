import StripeElement from "./StripeElement";

function SubscriptionPage() {

    return <>
        <div className="row text-center">
            <div className="col col-12 d-flex flex-column justify-content-center">
                <h1>Personal Shopper</h1>
                <div className="display-inline-block mx-auto mt-5">
                    <StripeElement />
                </div>
            </div>
        </div>
    </>
}

export default SubscriptionPage;