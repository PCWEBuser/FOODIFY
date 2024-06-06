import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Nav, Navbar, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import Navigation from "../components/navigation";


export default function PostPageDetails() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [ratings, setRatings] = useState("");
  const [country, setCountry] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [date, setDate] = useState('');
  const params = useParams();
  const id = params.id;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();


  async function deletePost(id) {
    await deleteDoc(doc(db, "posts", id));
    navigate("/");
  }


  async function getPost(id) {
    const postDocument = await getDoc(doc(db, "posts", id));
    const post = postDocument.data();
    setCaption(post.caption);
    setImage(post.image);
    setCountry(post.country);
    setRatings(post.ratings);
    setMapUrl(post.mapUrl);
    setDate(post.date);
    setDescription(post.description);
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getPost(id);
  }, [id, navigate, user, loading]);

  return (
    <>
     <Navigation />
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col md="6">
            <Image src={image} style={{ width: "100%" }} />
          </Col>
          <Col>
          <Card className="mb-1">
              <Card.Body>
                <Card.Title as="h1">{caption}</Card.Title>
                <Card.Title as="h5">Description: {description}</Card.Title>
                <Card.Title as="h5">Country: {country}</Card.Title>
                <Card.Title as="h5">Location: {mapUrl}</Card.Title>
                <Card.Title as="h5">Last Visit: {date}</Card.Title>
                <Card.Title as="h5">Ratings: {ratings}</Card.Title>
                <Button variant="info" href={`/update/${id}`}>Edit</Button>
                {' '}
                <Button variant="danger" onClick={() => deletePost(id)}
                  style={{ cursor: "pointer" }}
                >Delete</Button>
                  
                  
              </Card.Body>
              
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
