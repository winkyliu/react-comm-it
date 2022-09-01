import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App"
import Search from "./pages/Search/search"
import MovieDetails from "./pages/Movies/movieDetails"
import Actors from "./pages/Actors/actors"
import ActorDetails from "./pages/Actors/actorDetails"
import Personal from "./pages/Personal/personal"
import About from "./pages/About/about"

function Navigator() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />

                    <Route path="/movies/:movieId" element={<MovieDetails />} />

                    <Route path="/actors" element={<Actors />} />
                    <Route path="/actors/:actorId" element={<ActorDetails />} />

                    <Route path="/personal" element={<Personal />} />

                    <Route path="/about" element={<About />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Navigator;