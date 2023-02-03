import StripeElement from "./StripeElement";

function SubscriptionPage() {

    return <>
        <div className="row text-start">
            <div className="col col-12 col-xxl-6 col-xl-6 d-flex flex-column justify-content-start">
                <h1>Personal Shopper</h1>
                <p className="text-muted">MinFit provides a personal shopper service since January 2023.</p>
                <p>Our experts will help you create the most efficient and versatile wardrobe to focus on what is most important on a daily basis.</p>
                <p className="shadow p-4 my-4">Subscribe today for <strong>$50/month</strong>* and our team will contact you to set-up your first meeting with your personal shopper.
                </p>
                <p><small>* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet sagittis ante, vel mattis orci consequat sit amet. Vestibulum imperdiet, arcu non imperdiet semper, tellus velit gravida dolor, scelerisque volutpat lectus quam a lacus. Fusce vulputate est non massa elementum tempor. Nam sed quam ut lectus lobortis pretium vel ac elit. In euismod nisl magna, a dapibus velit accumsan vel. Sed gravida, elit eu mattis lobortis, risus mi mollis mauris, congue rhoncus lorem nunc eget tellus. Maecenas rhoncus ultricies nunc sed ullamcorper.</small></p>
            </div>
            <div className="col col-12 col-xxl-6 col-xl-6 d-flex flex-column justify-content-start">
                <div className="display-inline-block mx-auto mt-5">
                    <StripeElement />
                </div>
            </div>
        </div>
    </>
}

export default SubscriptionPage;