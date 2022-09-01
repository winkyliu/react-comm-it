import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles.css";

function Footer() {
  return (
    <footer>
      <div className="d-flex justify-content-center align-items-center">
        <p className="mr-1 credits-text">Developed by   </p>
        <a className="mhq" target="_blank" href="mailto:winkyliu.sk@gmail.com">
          Chenguang Liu
          <FontAwesomeIcon className="ml-2" icon="fa-brands fa-google" />
        </a>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <p className="mr-1 credits-text">Powered by   </p>
        <a
          className="TMDB-attribution"
          target="_blank"
          href="https://developers.themoviedb.org/3/getting-started/introduction"
        >
          TMDB
        </a>
      </div>
    </footer>
  );
}

export default Footer;