import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { Button, Container, Nav, Navbar, Form, FormControl } from "react-bootstrap";

export default function Navigation() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const SearchBlog = (e) => {
    e.preventDefault();
    const filteredPosts = posts.filter((post) =>
      post.caption.toLowerCase().includes(search.toLowerCase())
    );
    setPosts(filteredPosts);
  };

  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">FOODIFY</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/add">New Post</Nav.Link>
            <Nav.Link href="/">Singapore</Nav.Link>
            <Nav.Link href="/">Overseas</Nav.Link>
            <Nav.Link onClick={() => signOut(auth)} href="/login">Sign Out!</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={SearchBlog}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
