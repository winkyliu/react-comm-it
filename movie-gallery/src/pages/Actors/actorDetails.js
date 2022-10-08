import React, { useState, useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import moment from "moment";

import BtnMore from "../../components/Others/BtnMore";
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import LoadingPerson from "../../components/Loading/LoadingPerson";
import MainCard from "../../components/MainCard/MainCard";
import Social from "../../components/Others/Social";
import Comments from "../../components/Comments/Comments";
import api from "../../services/tmdb/api";
import { GetImage, GetDepartmentPerson } from "../../functions/utils";
import placeholder from "../../resources/img/placeholder.jpg";

import "./styles.css";

function ActorDetails({ history }) {
  let params = useParams();
  const id = params.actorId;

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (id === undefined) {
      history.push({ pathname: "/" });
    }
  }, [id]);

  useEffect(() => {
    function LoadDetails() {
      api
        .get(`/person/${id}`, {
          params: {
            append_to_response: "external_ids,combined_credits",
            language: "en",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setDetails(response.data);
          }
        })
        .catch((error) => {
          console.log("LoadDetails error " + error);
        })
        .finally(() => setLoading(false));
    }

    LoadDetails();
  }, [id]);

  function RenderInfo() {
    return (
      <>
        {details.known_for_department && (
          <div className="info-item">
            <h3>Known for</h3>
            <p>{GetDepartmentPerson(details.known_for_department)}</p>
          </div>
        )}

        <div className="info-item">
          <h3>Gender</h3>
          <p>{details.gender === 1 ? "Female" : "Male"}</p>
        </div>

        {details.birthday && details.birthday != null && (
          <div className="info-item">
            <h3>Birthday</h3>
            <p>
              {moment(details.birthday).format("DD/MM/YYYY")}{" "}
              {details.deathday == null && (
                <span>
                  ({`${moment().diff(details.birthday, "years")} years old`})
                </span>
              )}
            </p>
          </div>
        )}

        {details.deathday !== null && (
          <div className="info-item">
            <h3>Deathday</h3>
            <p>
              {moment(details.deathday).format("DD/MM/YYYY")} (
              {`${moment().diff(details.birthday, "years")}`})
            </p>
          </div>
        )}

        {details.place_of_birth && (
          <div className="info-item">
            <h3>Place of birth</h3>
            <p>{details.place_of_birth}</p>
          </div>
        )}

        {details.also_known_as.length > 0 && (
          <div className="info-item">
            <h3>Also known as</h3>
            <div className="d-flex flex-column  justify-content-center justify-content-md-start">
              {details.also_known_as.map((item, index) => {
                return <p key={index}>{item}</p>;
              })}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div>
      

      {loading ? (
        <LoadingPerson />
      ) : (
        <Container className="mt-4 p-0" fluid>
          <div className="d-flex flex-wrap">
            <Col xs={12} md={4} lg={4}>
              <div className="info text-center text-md-left">
                <img
                  title={details.name}
                  alt={details.name}
                  style={{ borderRadius: 6 }}
                  className="mb-4 img-fluid"
                  src={
                    details.profile_path != null
                      ? GetImage("original", details.profile_path)
                      : placeholder
                  }
                />
                <Social
                  social={details.external_ids}
                  homepage={details.homepage}
                />

                <h1 className="d-block d-md-none font-weight-bold mb-4 mt-3 text-center text-md-left">
                  {details.name}
                </h1>
                <h3 className="mt-3">Personal information</h3>
                <div className="person-info">{RenderInfo()}</div>
              </div>
            </Col>

            <Col xs={12} md={8} lg={8}>
              <div className="panel">
                <h1 className="d-none d-md-block font-weight-bold mb-4 text-center text-md-left">
                  {details.name}
                </h1>

                {details.biography && (
                  <div className="info-item text-center text-md-left">
                    <h3>Biography</h3>
                    <p className="biography-text">{details.biography}</p>
                  </div>
                )}
              </div>

              {details.combined_credits.cast.length > 0 && (
                <div className="mt-5">
                  <h3 className="mb-4 text-center text-md-left">
                    Known for
                  </h3>
                  <div className="d-flex flex-wrap mt-4">
                    <MainCard
                      list_movie={details.combined_credits.cast.slice(
                        0,
                        showMore ? 999 : 8
                      )}
                      type={"movie"}
                    />
                  </div>
                  <BtnMore
                    qty={details.combined_credits.cast.length}
                    handler_show={setShowMore}
                    show={showMore}
                  />
                </div>
              )}
            </Col>
          </div>
        </Container>
      )}

      <Comments type="actor" cid={id} />
    </div>
  );
}

export default ActorDetails;

//<MainNavBar history={history} />