import React from "react";

import MainNavBar from "../../components/MainNavBar/MainNavBar";
import Footer from "../../components/Footer/Footer";

function Personal({ history }) {
    return (
        <div>
            <MainNavBar history={history} />
            <h3>Recommendations</h3>
            <p>Please sign in to get your personal recommendations.</p>
            <Footer />
        </div>
    );
}

export default Personal