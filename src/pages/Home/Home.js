import MyNavbar from '../../components/navbar/navbar';
import Question from '../../components/questioncard/questioncard';
import { useEffect, useState } from 'react';
import './home.css'
import Hashtag from '../../components/hashtag/hashtag';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
const axios = require('axios');
function Home() {

    const [question, setQuestion] = useState([]);
    const [loading, setLoading] = useState(true);

    const getQuestion = async () => {
        try {
            await axios.get('https://binh-ask-answer.herokuapp.com/api/question')
                .then((response) => {
                    setQuestion(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getQuestion();
    }, [])

    return (
        <>
            {
                loading ?
                    (<div className="loader">
                        <ClimbingBoxLoader className="loader" color={`#36D7B7`} loading={loading} size={50} />
                    </div>)
                    : (
                        <div>
                            <MyNavbar></MyNavbar>
                            <div className="homeback">
                                <div className="questioncontainer">
                                    <h1>Questions: </h1>
                                    {
                                        question.map((value, index) => {
                                            return (
                                                <Question
                                                    key={index}
                                                    id={value._id}
                                                    content={value.question_content}
                                                    name={value.user_id.name}
                                                    hashtag={value.hashtags}>
                                                </Question>
                                            )
                                        })
                                    }
                                </div>
                                <div className="hashtagcontainer">
                                    <Hashtag></Hashtag>
                                </div>
                            </div>
                        </div>
                    )
            }

        </>
    )
}

export default Home;