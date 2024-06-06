import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image, Nav, Navbar } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Navigation from "../components/navigation";


export default function PostPageUpdate() {
  const params = useParams();
  const id = params.id;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [ratings, setRatings] = useState("");
  const [country, setCountry] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [date, setDate] = useState('');
  const [previewImage, setPreviewImage] = useState(
    "https://zca.sg/img/placeholder"
  );
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  async function updatePost() {
    const imageReference = ref(storage, `images/${image.name}`);
    const response = await uploadBytes(imageReference, image);
    const imageUrl = await getDownloadURL(response.ref);
    
    await updateDoc(doc(db, "posts", id), { date,description, mapUrl,country,ratings,caption, image: imageUrl });
    navigate("/");
  }

  async function getPost(id) {
    const postDocument = await getDoc(doc(db, "posts", id));
    const post = postDocument.data();
    setCaption(post.caption);
    setImage(post.image);
    setPreviewImage(post.image);
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
  }, [id, loading, navigate, user]);
  return (
    <div>
      <Navigation />
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Update Post</h1>
        <Form>
        <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Image
            src={previewImage}
            style={{
              objectFit: "cover",
              width: "20rem",
              height: "20rem",
              margin: "1rem",
            }}
          />
            <Form.Control
              type="file"
              onChange={(e) => {
                const imageFile = e.target.files[0];
                const previewImage = URL.createObjectURL(imageFile);
                setImage(imageFile);
                setPreviewImage(previewImage);
              }}
            />
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Food Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={caption}
              value={caption}
              onChange={(text) => setCaption(text.target.value)}
            />
          </Form.Group>
          <Form.Group>
        <Form.Label>Select Date</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={handleDateChange}
        />
      </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea" rows={3}
              type="text"
              placeholder={description}
              value={description}
              onChange={(text) => setDescription(text.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              as="textarea" rows={3}
              type="text"
              placeholder={country}
              value={country}
              onChange={(text) => setCountry(text.target.value)}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="mapLink">
            <Form.Label>Map Link</Form.Label>
            <Form.Control
              type="text"
              placeholder={mapUrl}
              value={mapUrl}
              onChange={(text) => setMapUrl(text.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="ratings">
            <Form.Label>Ratings</Form.Label>
            <Form.Control
              type="text"
              placeholder={ratings}
              value={ratings}
              onChange={(text) => setRatings(text.target.value)}
            />
          </Form.Group>


          <Button variant="primary" onClick={async (e) => updatePost()}>
            Upload
          </Button>
        </Form>
      </Container>
    </div>
  );
}