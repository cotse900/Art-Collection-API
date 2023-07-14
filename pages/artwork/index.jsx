import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Col, Container, Row, Pagination, Card } from 'react-bootstrap';
import Error from 'next/error';
import ArtworkCard from '@/components/ArtworkCard';

const per_page = 12;

export default function ArtIndex(){
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];
    let [ artworkList, setArtworkList ] = useState(null);
    let [ page, setPage ] = useState(1);
  
    const { data, error } = useSWR(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
    );

    const previousPage = () => page > 1 && setPage(--page);
    const nextPage = () => page < artworkList.length && setPage(++page);

    useEffect(() => {
        if (data != null && data != undefined) {
            const results = [];
            for (let i = 0; i < data?.objectIDs?.length; i += per_page) {
              const chunk = data?.objectIDs.slice(i, i + per_page);
              results.push(chunk);
            }
            setArtworkList(results);
            setPage(1);
        }
    }, [data]);

    if (error) {
        return <Error statusCode={404} />;
    }
    else if (!artworkList) return null;

    return (
        <>
        <Container>
            {artworkList.length > 0 ? (
                <>            
                <Row className="gy-4">
                    {artworkList[page - 1].map((currentObjectID) => (
                    <Col lg={3} key={currentObjectID}>
                        <ArtworkCard objectID={currentObjectID} />
                    </Col>
                ))}
                </Row>
                <Row>
                    <Col>
                        <Pagination>
                        <Pagination.Prev onClick={previousPage} />
                        <Pagination.Item>{page}</Pagination.Item>
                        <Pagination.Next onClick={nextPage} />
                        </Pagination>
                    </Col>
                </Row>
                </>
            ) : (
            <Card>
            <Card.Body>
                <h4>Nothing Here</h4>
                Try searching for something else.
            </Card.Body>
            </Card>
        )}        
        </Container>
        </>
    )
}