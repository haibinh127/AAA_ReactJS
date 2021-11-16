import { Card, Button } from 'react-bootstrap';
import { BsQuestionSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import './bookmarkcard.css';
const axios = require('axios');

function BookmarkCard(props) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/detail/${props.id}`);
    }

    const handleUnbookmark = async () => {
        try {
            axios.delete('https://binh-ask-answer.herokuapp.com/api/bookmark/bookmarkedquestion', {
                data: {
                    id: props.bmid,
                    user_id: props.userid
                }
            })
                .then((response) => {
                    alert("Delete success !");
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }

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
                    <Button onClick={handleUnbookmark} className="unbookmarkBtn" variant="link">Unbookmark</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default BookmarkCard;