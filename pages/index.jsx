//Chungon Tse
//Summer 2023
//This is not an assignment.
import React from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap';

export default function Home() {
  return (
    <div className='homepage'>
      <Container>
        <Row>
          <Col className="text-center">
            <Image width="70%" src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" fluid rounded />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col md={12}>
            <p>The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people.
              The museum's permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures from nearly all the European Old Masters, and an extensive collection of American and modern art.
              The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art.
              The museum is home to encyclopedic collections of musical instruments, costumes, and accessories, as well as antique weapons and armor from around the world.
              Several notable interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries.
              </p>
            <p>
              <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Read more...</a>              
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
