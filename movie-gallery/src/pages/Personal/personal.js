import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import { UserContext } from "../../navigator";

import MainCard from "../../components/MainCard/MainCard";

import { readUserData } from "../../services/firebase/firebase";
import api from "../../services/tmdb/api";

function Personal() {
    const [user, online] = useContext(UserContext);

    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const loadRecommendations = () => {
        api
          .get(`/movie/${user.favM}`, {
            params: {
              append_to_response:
                "recommendations",
            },
          })
          .then((response) => {
            if (response.status === 200) {
                setDetails(response.data);
                console.log("Personal: movie details", details);
            }
          })
          .catch((error) => {
            console.error("Personal: load recommendation failed", error);
          })
          .finally(() => {
            setLoading(false);
          });
    }

    const fetchFavouriteMovieAndActorAndRecommendation = async(uid) => {
        const docSnap = await readUserData(uid);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            user.favM = userData.favM;
            user.favA = userData.favA;

            if (user.favM !== -1) {
                console.log("Personal: load recommendation list.");
                loadRecommendations();
            } else {
                console.log("Personal: no favourite movie for recommendation.");
            }
        } else {
            console.error("Personal: fetch user's favourite failed!");
        }
    }

    useEffect(() => {
        console.log("Personal: fetch user's favourite movie and actor");
        if (user) {
            fetchFavouriteMovieAndActorAndRecommendation(user.uid);
        }
    }, []);

    if (user) {
        return (
          <Container>
            <Row className="justify-content-md-center" style={{ width: "100%", maxWidth: 1144 }}>
                <h3>Personal Info:</h3>
                <ul>
                    <li>Your user id: {user.uid}</li>
                    <li>Your email: {user.email}</li>
                    <li>Your name: {user.name}</li>
                </ul>

                {user.favM === -1 && (
                    <div>
                        <p>Please browse, comment and rate your favourite movies and actors! We need know you more for recommendations.</p>
                    </div>
                )}

                {!loading && details.recommendations.results.length > 0 && (
                    <div className="d-flex flex-wrap mt-4">
                        <h3 className="w-100 mb-4 font-weight-bold text-center text-md-left">
                            Recommendations based on your favourite movie: {details.original_title} 
                        </h3>
                        <MainCard
                            list_movie={details.recommendations.results.slice(0, 12)}
                            type="movie"
                        />
                    </div>
                )}
            </Row>
          </Container>
        );
    } else {
        return (
            <div style={{ width: "100%", maxWidth: 1144, justifyContent: "center" }}>   
                <h3>Please sign in to get your personal recommendations.</h3>
            </div>
        );
    }
}

export default Personal;