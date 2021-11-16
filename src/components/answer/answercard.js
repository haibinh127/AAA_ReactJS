import { Card } from 'react-bootstrap';
import { BsChatDotsFill } from "react-icons/bs";
import './answercard.css';

function Answer(props) {

    return (
        <>
            <div className="answericon">
                <BsChatDotsFill size='30px' ></BsChatDotsFill>
            </div>
            <Card style={{ width: '45rem', height: '8rem' }}>
                <Card.Header>Author: {props.author}</Card.Header>
                <Card.Body>
                    <Card.Title>{props.content}</Card.Title>
                    {/* <Card.Text>
                        {props.content}
                    </Card.Text> */}
                </Card.Body>
            </Card>
        </>
    )

}

export default Answer;