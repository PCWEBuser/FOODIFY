import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image,Col} from "react-bootstrap";
import { addDoc, collection} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Navigation from "../components/navigation";



export default function PostPageAdd() {
  const [user, loading] = useAuthState(auth);
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
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const navigate = useNavigate();

  async function addPost() {
    const imageReference = ref(storage, `images/${image.name}`);
    const response = await uploadBytes(imageReference, image);
    const imageUrl = await getDownloadURL(response.ref);
    await addDoc(collection(db, "posts"), { date,description,mapUrl,country,ratings,caption, image: imageUrl });
    navigate("/");
  }


  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [navigate, user, loading]);


  return (
    <>
      <Navigation />
      <Container fluid>
        <h1 style={{ marginBlock: "1rem" }}>Add Food Location</h1>
        <Col>
        <Form>
        <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Image
            src={previewImage}
            style={{
              objectFit: "cover",
              width: "20rem",
              height: "20rem",
              margin: "1rem"
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
              placeholder="Food Name"
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
              placeholder="Rich Flavour Ba Chor Mee with loads of pork lard"
              value={description}
              onChange={(text) => setDescription(text.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              as="textarea" rows={3}
              type="text"
              placeholder="Singapore"
              value={country}
              onChange={(text) => setCountry(text.target.value)}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="mapLink">
            <Form.Label>Map Link</Form.Label>
            <Form.Control
              type="text"
              placeholder="Google Map link"
              value={mapUrl}
              onChange={(text) => setMapUrl(text.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="ratings">
            <Form.Label>Ratings</Form.Label>
            <Form.Control
              type="text"
              placeholder="1 - 5"
              value={ratings}
              onChange={(text) => setRatings(text.target.value)}
            />
          </Form.Group>


          <Button variant="primary" onClick={async (e) => addPost()}>
            Upload
          </Button>
        </Form>
        
      </Col>

      </Container>
      
    </>
  );
}
