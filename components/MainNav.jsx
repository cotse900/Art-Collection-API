import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { searchHistoryAtom } from '@/store';

//https://webprogrammingforappsandservices.sdds.ca/Forms-Introduction/react-forms

export default function MainNav() {
    const router = useRouter();
    const [ searchField, setSearchText ] = useState("");
    const [ isExpanded, setIsExpanded ] = useState(false);
    const [ searchHistory, setSearchHistory ] = useAtom(searchHistoryAtom);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(searchField);
 
        let queryString = `title=true&q=${searchField}`;
        setSearchHistory((current) => [...current, queryString]);
        setSearchText('');
        router.push(`/artwork?title=true&q=${searchField}`);
    }

    const toggleNavbar = () => {
      setIsExpanded(!isExpanded); // Toggle the isExpanded state
    }

    const toggleNavLinkClick = () => {
      setIsExpanded(false); // Close the navbar when a Nav.Link is clicked
    }

    return (
      <>
      <Navbar className="fixed-top navbar-dark bg-dark" expand="md" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Chungon Tse</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar}/>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="/" active={router.pathname === '/'} onClick={toggleNavLinkClick}>Home</Nav.Link>
            <Nav.Link href="/search" active={router.pathname === '/search'} onClick={toggleNavLinkClick}>Advanced Search</Nav.Link>
          </Nav>
          &nbsp;
          <Form className="d-flex align-items-center" onSubmit={handleSubmit}>
            <FormControl onChange={(e) => setSearchText(e.target.value)} value={searchField} type="Search" placeholder="Search" aria-label="Search" className="me-2"/>
            <Button type='submit' variant="outline-success">Search</Button>
          </Form>
          &nbsp;
          <Nav className="ml-auto">
            <NavDropdown title="User Name">
              <Link href="/favourites" passHref legacyBehavior>              
                <NavDropdown.Item
                  active={router.pathname === '/favourites'}
                  href="/favourites" onClick={toggleNavLinkClick}>
                  Favourites
                </NavDropdown.Item>
              </Link>

              <Link href="/history" passHref legacyBehavior>              
                <NavDropdown.Item
                  active={router.pathname === '/history'}
                  href="/history">
                  Search History
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
    )
  }
  