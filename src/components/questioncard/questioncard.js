import { Card } from 'react-bootstrap';
import { BsQuestionSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import './questioncard.css';

function Question(props) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/detail/${props.id}`);
    }

    return (
        <>
            <div className="questionicon">
                <BsQuestionSquareFill size='30px'></BsQuestionSquareFill>
            </div>
            <Card style={{ width: '36rem', height: '8rem' }}>
                <Card.Body>
                    <Card.Title onClick={handleClick}>{props.content}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Author: {props.name}</Card.Subtitle>
                    Hashtags: <Card.Link>{props.hashtag}</Card.Link>
                    {/* <div> 4 likes</div> */}
                </Card.Body>
            </Card>
        </>
    )
}

export default Question;