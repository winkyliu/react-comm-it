import React, { useState, useContext, useEffect, useRef } from "react";
import { Form, ListGroup, Button, Container, Row, Col, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Rating } from "react-simple-star-rating";

import { UserContext } from "../../navigator";
import { loadMovieComments, 
    loadActorComments, 
    commentActor, 
    commentMovie 
} from "../../services/firebase/firebase";

function Comments({ ...props }) {
    const { type, cid } = props;

    const [user, online] = useContext(UserContext);

    const [loading, setLoading] = useState(true);
    const [listComment, setListComment] = useState([]);
    const [commented, setCommented] = useState(false);

    const [validated, setValidated] = useState(false);
    const [commentInfo, setCommentInfo] = useState({
        id: cid,
        c: "",
        stars: 0,
    })
    const [ratingValue, setRatingValue] = useState(0)

    const commentArea = useRef(null);
    const commentRate = useRef(null);

    const setMovieListComment = async(movieId) => {
        console.log("Comments: setMovieListComment", movieId);
        const querySnapshot = await loadMovieComments(movieId);

        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            listComment.push(doc.data());
        });

        setListComment(listComment);

        setLoading(false);
    }

    const setActorListComment = async(actorId) => {
        console.log("Comments: setActorListComment", actorId);
        const querySnapshot = await loadActorComments(actorId);
        
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            listComment.push(doc.data());
        });

        setListComment(listComment);

        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);

        // clear history data when re-render this component
        setListComment([]);

        console.log("start load comments.");
        if (type === "movie") {
            setMovieListComment(cid);
        } else {
            setActorListComment(cid);
        }

        setCommented(false);
    }, [commented]);

    const handleValidate = () => {
        return commentInfo.c.length > 0;
    }

    const handleChange = (value) => {
        commentInfo.c = value;
        setCommentInfo(commentInfo);
        setValidated(handleValidate());
    }

    const handleRating = (rate) => {
        commentInfo.stars = rate;
        setCommentInfo(commentInfo);
    }

    const onComment = async(event) => {
        event.preventDefault();
        if (type === "movie") {
            await commentMovie(commentInfo.id, user.uid, commentInfo.c, commentInfo.stars);
        } else {
            await commentActor(commentInfo.id, user.uid, commentInfo.c, commentInfo.stars);
        }

        setCommented(true);

        commentArea.current.value = "";
        setRatingValue(0);
    }

    return (
        <Container>
          <Row className="justify-content-md-center" style={{ width: "100%", maxWidth: 1144 }}>
            <div className="mt-5 d-flex flex-wrap">
                {!loading && listComment.length === 0 && (
                    <p>
                        No comments on this {type}. Be the first one to comment.
                    </p>
                )}

                {!loading && (
                    <Accordion alwaysOpen>
                        {listComment.map((item) => {
                            const timeStr = new Date(item.cts.seconds * 1000).toDateString();
                            return (
                                <Accordion.Item disabled="true">
                                  <Accordion.Header>
                                    <Container>
                                      <Row style={{ width: "100%", maxWidth: 1144 }}>    
                                        <Col className="fw-bold">{item.uname}</Col>
                                        <Col md="auto">{timeStr}</Col>
                                        <Col xs lg="2"><Rating ratingValue={item.stars} size={18} /></Col>
                                      </Row>
                                    </Container>
                                  </Accordion.Header>

                                  <Accordion.Body>
                                    {item.comment}
                                  </Accordion.Body>
                                </Accordion.Item>
                            );
                        })}
                    </Accordion>
                )}
            </div>

            <div>
                {!user && (
                    <p>Please <Link to="/personal/signin">sign in</Link> to comment.</p>
                )}
                {user && (<Form onSubmit={(e) => {onComment(e);}}>
                    <Form.Control ref={commentArea} as="textarea" placeholder="Leave a comment here." style={{ height: '100px' }} onChange={(e) => {handleChange(e.target.value);}} />
                    <Rating ref={commentRate} onClick={handleRating} ratingValue={ratingValue}/>
                    <Button variant="primary" type="submit" disabled={!validated}>Comment</Button>
                </Form>)}
            </div>
          </Row>
        </Container>
    );
}

export default Comments;

/*
{!loading && (
                    <ListGroup as="ul" variant="flush">
                        {listComment.map((item) => {
                            const timeStr = new Date(item.cts.seconds * 1000).toDateString();
                            return (
                                <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                                    <Container>
                                      <Row style={{ width: "100%", maxWidth: 1144 }}>    
                                        <Col className="fw-bold">{item.uname}</Col>
                                        <Col md="auto">{timeStr}</Col>
                                        <Col xs lg="2"><Rating ratingValue={item.stars} size={18} /></Col>
                                      </Row>

                                      <Row style={{ width: "100%", maxWidth: 1144 }}>
                                        <Col xs="auto">{item.comment}</Col>
                                      </Row>

                                    </Container>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                )}
*/