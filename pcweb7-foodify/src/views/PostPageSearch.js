import { useEffect, useState,useRef} from "react";
import { Form,Container, Card, Button,Image, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import Navigation from "../components/navigation";

export default function PostPageHome() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const SearchBlog = (e) => {
    e.preventDefault();
    const filteredPosts = posts.filter((post) =>
      post.caption.toLowerCase().includes(search.toLowerCase())
    );
    setPosts(filteredPosts);
  };

  // const [posts, setPosts] = useState([]);

  async function getAllPosts() {
    const query = await getDocs(collection(db, "posts"));
    const posts = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setPosts(posts);
  }


  useEffect(() => {
    getAllPosts();
  }, []);

  
  const ImagesRow = () => {
    return posts.map((post, index) => <ImageSquare key={index} post={post} />);
  };

  return (
    <>
      <Navigation />
    <Container>
        <br></br>
    <Form className="d-flex" onChange={SearchBlog}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>

        <Row>
          <ImagesRow />
        </Row>
      </Container>
    </>
  );
}

function ImageSquare({ post }) {
  const { image, id } = post;
  return (
    <Link
      to={`../post/${id}`}
      style={{
        width: "18rem",
        marginLeft: "1rem",
        marginTop: "2rem",
      }}
    >
      <Image
        src={image}
        style={{
          objectFit: "cover",
          width: "18rem",
          height: "18rem",
        }}
      />
    </Link>
  );
}