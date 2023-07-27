import { Row, Col } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);

    if (favouritesList.length === 0){
        return <p><strong>Nothing here.</strong> Try adding some new artwork to the list.</p>;
    }

    return (
        <Row>
        {favouritesList.map(objectID => (
          <Col key={objectID} lg={3}>
            <ArtworkCard objectID={objectID} />
          </Col>
        ))}
      </Row>
    )
}