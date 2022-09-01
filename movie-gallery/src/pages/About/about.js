import React from "react";

import MainNavBar from "../../components/MainNavBar/MainNavBar";
import Footer from "../../components/Footer/Footer";

function About({ history }) {

    return (
        <div>
            <MainNavBar history={history} />

            <div>
                <h3>About this website.</h3>
                <p>
                    This website is designed for the final presentation of the ReactJS course from ComIT.
                </p>
                <p>
                    And also the website is designed by a big movie fan and for movie fans. You can:
                </p>
                <ul>
                    <li>Explore the movies and actors you like.</li>
                    <li>Leave and share your comments for movies and actors you like.</li>
                    <li>Get personal recommendations based on your tastes.</li>
                </ul>

                <p>Thanks to TMDB~ All the movies and actors data comes from 'The Movie Database'.</p>
            </div>

            <div>
                <h3>About Chenguang.</h3>
                <ul>
                    <li>A newcomer from China.</li>
                    <li>Have a master degree of Computer Science and 7-8 years work experience as a data engineer and a back-end programmer.</li>
                    <li>Looking for opportunities around Saskatchewan.</li>
                </ul>
            </div>

            <Footer />
        </div>
    );
}

export default About;