import MyNavbar from '../../components/navbar/navbar';
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import './Bookmark.css';
import BookmarkCard from '../../components/bookmarkcard/bookmarkcard';
import Hashtag from '../../components/hashtag/hashtag';
const axios = require('axios');

function Bookmark() {

    const { id } = useParams();

    const [bookmarks, setBookmarks] = useState([]);

    const getBookmarks = async () => {
        try {
            await axios.get(`https://binh-ask-answer.herokuapp.com/api/bookmark/${id}`)
                .then((response) => {
                    console.log(response.data);
                    setBookmarks(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBookmarks();
    }, [])

    return (
        <>
            <MyNavbar />
            <div className="homeback">
                <div className="questioncontainer">
                    <h1>Questions: </h1>
                    {
                        bookmarks.map((value, index) => {
                            return (
                                <BookmarkCard
                                    key={index}
                                    id={value.question_id._id}
                                    content={value.question_id.question_content}
                                    name={value.question_id.user_id.name}
                                    hashtag={value.question_id.hashtags}
                                    bmid={value._id}
                                    userid={value.user_id}
                                >
                                </BookmarkCard>
                            )
                        })
                    }
                </div>
                <div className="hashtagcontainer">
                    <Hashtag></Hashtag>
                </div>
            </div>
        </>
    )

}

export default Bookmark;