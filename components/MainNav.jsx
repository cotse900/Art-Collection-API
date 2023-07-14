import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
//https://webprogrammingforappsandservices.sdds.ca/Forms-Introduction/react-forms

export default function MainNav() {
    const router = useRouter();
    const [ searchField, setSearchText ] = useState("");

    const updateSearchText = (event) => {
        setSearchText(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(searchField);
        if (searchField.trim() != ''){
            router.push(`/artwork?title=true&q=${searchField}`);            
        }
        event.target.reset();
    }

    return (
      <>
      <Navbar className="fixed-top navbar-dark bg-dark">
        <Container>
          <Navbar.Brand>Chungon Tse</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Link href="/" passHref legacyBehavior><Nav.Link>Home</Nav.Link></Link>
            <Link href="/search" passHref legacyBehavior><Nav.Link>Advanced Search</Nav.Link></Link>
          </Nav>

          <Form className="d-flex align-items-center" onSubmit={handleSubmit}>
            <FormControl onChange={updateSearchText} type="Search" placeholder="Search" aria-label="Search" className="me-2"/>
            <Button type='submit' variant="outline-success">Search</Button>
          </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
    )
  }
  