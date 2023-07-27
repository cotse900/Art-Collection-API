import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from "next/router";
import { Card, ListGroup, Button } from 'react-bootstrap';
import styles from "@/styles/History.module.css";

export default function History() {
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const historyClicked = (e, index) => {
        e.preventDefault();
        router.push(`/artwork?${searchHistory[index]}`);
    }

    const removeHistoryClicked = (e, index) => {
        e.stopPropagation();
        setSearchHistory((current) => {
            const x = [...current];
            x.splice(index, 1);
            return x;
        });
    }

    let parsedHistory = [];
    searchHistory.forEach((h) => {
      let params = new URLSearchParams(h);
      let entries = params.entries();
      parsedHistory.push(Object.fromEntries(entries));
    });

    return (
        <div>
            { parsedHistory.length === 0 ? (
                <Card>
                    <Card.Body><strong>Nothing Here.</strong> Try searching for some artwork.</Card.Body>
                </Card>
                ) : (
                <ListGroup>
                    {parsedHistory.map((historyItem, index) => {
                        return(
                        <ListGroup.Item 
                            key={index}
                            onClick={(e) => historyClicked(e, index)}
                            className={styles.historyListItem}
                        >
                            {Object.keys(historyItem).map((key) => (
                                <>
                                {key}: <strong>{historyItem[key]}</strong>&nbsp;
                                </>
                            ))}
                            <Button className="float-end" variant="danger" size="sm" 
                            onClick={(e) => removeHistoryClicked(e, index)}>
                                &times;</Button>
                        </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            ) }
        </div>
    )
}