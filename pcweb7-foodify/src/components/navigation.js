import { signOut } from "firebase/auth";
import { useState } from "react";
import { Button, Container, Nav, Navbar, Form, FormControl } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

export default function Navigation() {
  return (
    <Navbar className="d-flex" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand href="/">FOODIFY <FontAwesomeIcon icon={faUtensils} size="2x" /> </Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">New Post</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link onClick={() => signOut(auth)} href="/login">Sign Out!</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}
