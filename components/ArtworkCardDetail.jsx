import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from 'react';

export default function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(
        objectID? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));

    useEffect(() => {
        console.log("Favourites list updated: ", favouritesList);
      }, [favouritesList]);

    const favouritesClicked = () => {
        if (showAdded) {
            setFavouritesList(current => current.filter(fav => fav !== objectID));
            setShowAdded(false);
        } else {
            setFavouritesList(current => [...current, objectID]);
            setShowAdded(true);
        }
    }
    
    if (error) {
        return <Error statusCode={404} />;
    }

    if (!data || data.length === 0){
        return null;
    }
    else {
        return(
            <Card className="card-background" style={{ width: '18rem' }}>
                {data.primaryImageSmall && <Card.Img variant="top" src={data.primaryImage} />}
                <Card.Body>
                    {data.title? <Card.Title className='card-title'>{data.title}</Card.Title>: <Card.Title>N/A</Card.Title>}
                    <Card.Text>
                        {data.objectDate? <p className='card-date'>{data.objectDate}</p> : <p>N/A</p>}
                        {data.classification? <p>{data.classification}</p> : <p>N/A</p>}
                        {data.medium ? <p>{data.medium}</p> : <p>N/A</p> }
                        <br /><br />
                        
                        {data.artistDisplayName ? <span><p>{data.artistDisplayName}</p><p><a href={data.artistWikidata_URL} 
                        target="_blank" rel="noreferrer">wiki</a></p></span> : <p>N/A</p> }
                        
                        {data.creditLine ? <p>{data.creditLine}</p> : <p>N/A</p> }
                        {data.dimensions ? <p>{data.dimensions}</p> : <p>N/A</p> }
                    </Card.Text>
                    <Button variant={ showAdded? "primary" : "outline-primary" } onClick={ favouritesClicked }>
                        { showAdded? "+ Favourite (added)" : "+ Favourite" }
                    </Button>
                </Card.Body>
            </Card>    
        )
    }
}