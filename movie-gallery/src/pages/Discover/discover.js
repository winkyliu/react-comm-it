import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Form } from "react-bootstrap";
import Select from "react-select";

//import MainNavBar from "../../components/MainNavBar/MainNavBar";
import LoadingCard from "../../components/Loading/LoadingCard";
import MainPagination from "../../components/MainPagination/MainPagination";
import { GetListYears, GetListSort } from "../../functions/utils";
import MainCard from "../../components/MainCard/MainCard";
import api from "../../services/tmdb/api";
import moment from "moment";

function Discover({ history }) {
  const listScroll = useRef(null);
  const scrollToRefObject = (ref) => window.scrollTo(0, ref.current?.offsetTop);

  const [year, setYear] = useState({
    label: moment().format("YYYY"),
    value: moment().format("YYYY"),
  });
  const [sort, setSort] = useState({
    label: "Popularity Desc",
    value: "popularity.desc",
  });
  const [listMovie, setListMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  //Select
  const [optionsYear, setOptionsYear] = useState(GetListYears);
  const [optionsSort, setOptionsSort] = useState(GetListSort);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [totalResults, setTotalResults] = useState(null);

  useEffect(() => {
    function LoadMovies() {
      scrollToRefObject(listScroll);
      setLoading(true);

      var obj = {
        page: currentPage,
        sort_by: sort?.value,
      };
      obj.primary_release_year = year?.value;

      api
        .get(`/discover/movie`, {
          params: obj,
        })
        .then((response) => {
          if (response.status === 200) {
            setListMovie(response.data.results);
            setLastPage(response.data.total_pages);
            setTotalResults(response.data.total_results);
          }
        })
        .catch((error) => {
          console.log("LoadMovies error " + error);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    }

    LoadMovies();
  }, [year, sort, currentPage]);

  return (
    <div ref={listScroll}>
      

      <Container fluid>

        <div className="d-flex flex-wrap mt-4">
          <Col xs={12} sm={4} lg={2} className="mb-3 mb-md-0">
            <Form.Label className="field-label">Year</Form.Label>
            <Select
              noOptionsMessage={() => "No options"}
              classNamePrefix="react-select"
              placeholder={"Select"}
              options={optionsYear}
              isClearable={false}
              value={year}
              onChange={(item) => {
                setCurrentPage(1);
                setYear(item);
              }}
            />
          </Col>

          <Col xs={12} sm={8} md={6} lg={3}>
            <Form.Label className="field-label">Sort by</Form.Label>
            <Select
              noOptionsMessage={() => "No options"}
              classNamePrefix="react-select"
              placeholder={"Select"}
              options={optionsSort}
              isClearable={false}
              value={sort}
              onChange={(item) => {
                setCurrentPage(1);
                setSort(item);
              }}
            />
          </Col>
        </div>

        <div className="mt-5 d-flex flex-wrap">
          {loading && <LoadingCard qty={8} />}

          {!loading && listMovie.length === 0 && (
            <div className="container-empty">
              <p>
                No results were found that match your search criteria.
              </p>
            </div>
          )}

          {!loading && <MainCard type="movie" list_movie={listMovie} />}
        </div>

        {listMovie.length > 0 && (
          <MainPagination
            handler_current_page={setCurrentPage}
            current_page={currentPage}
            total_results={totalResults}
            last_page={lastPage}
            loading={loading}
          />
        )}
      </Container>
    </div>
  );
}

export default Discover;

//<MainNavBar history={history} />