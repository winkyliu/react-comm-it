import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import App from "./App"

import MainNavBar from "./components/MainNavBar/MainNavBar";
import Footer from "./components/Footer/Footer";
import Discover from "./pages/Discover/discover";
import MovieDetails from "./pages/Movies/movieDetails"
import Actors from "./pages/Actors/actors"
import ActorDetails from "./pages/Actors/actorDetails"
import Personal from "./pages/Personal/personal"
import SignIn from "./pages/Personal/signIn"
import SignUp from "./pages/Personal/signUp"
import About from "./pages/About/about"

//import { subscribeAuthStateChangeEvent } from "./services/firebase/firebase";

export const UserContext = createContext({});
const UserProvider = UserContext.Provider;

function Navigator() {
    const [user, setUser] = useState(null);

    const online = (u) => {
        setUser(u);
    }

    /*
    useEffect(() => {
        const subscribe = subscribeAuthStateChangeEvent(setUser);

        return () => {
            subscribe();
        }
    }, []);*/

    return (
      <UserProvider value={ [user, online] }>
        <div className="app">
            <BrowserRouter>
                <MainNavBar />

                <Routes>
                    <Route path="/" element={<Discover />} />

                    <Route path="/movies/:movieId" element={<MovieDetails />} />

                    <Route path="/actors" element={<Actors />} />
                    <Route path="/actors/:actorId" element={<ActorDetails />} />

                    <Route path="/personal" element={<Personal />} />
                    <Route path="/personal/signup" element={<SignUp />} />
                    <Route path="/personal/signin" element={<SignIn />} />

                    <Route path="/about" element={<About />} />
                </Routes>
            </BrowserRouter>

            <Footer />
        </div>
      </UserProvider>
    );
}

export default Navigator;