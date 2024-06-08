"use client";

import Container from "react-bootstrap/Container";
import {Nav, Navbar} from "react-bootstrap";
import {useEffect, useState} from "react";


export default function NavbarComponent() {

  let [email, setEmail] = useState(null);

  useEffect(() => {
    if (email === null) {
      const userBySession = JSON.parse(localStorage.getItem("user"));
      userBySession !== null && setEmail(userBySession.email);
    }
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Menu</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/users">Lista de usuarios</Nav.Link>
            <Nav.Link href={`/users/${email}`}>Perfil del usuario</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Registrarme</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}