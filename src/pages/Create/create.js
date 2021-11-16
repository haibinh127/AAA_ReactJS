import MyNavbar from '../../components/navbar/navbar';
import './create.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
const axios = require('axios');

function Create() {

    const [loading, setLoading] = useState(true);
    const [hashtag, setHashtag] = useState('');
    const [questioncontent, setQuestioncontent] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getUser = async (token) => {
        try {
            await axios.get(
                'https://binh-ask-answer.herokuapp.com/api/user/getuser',
                {
                    headers: {
                        "auth-token": token
                    }
                }
            )
                .then((response) => {
                    var res = response.data;
                    setUser(res.user);
                },
                    (error) => {
                        console.log(error);
                    }
                );
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUser(token);
        } else {
            setUser(null);
        }
    }, [])

    const onChangeHashtag = (e) => {
        setHashtag(e.target.value);
    }

    const onChangeQuestion = (e) => {
        setQuestioncontent(e.target.value);
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://binh-ask-answer.herokuapp.com/api/question/create', {
                user_id: user._id,
                hashtags: hashtag,
                question_content: questioncontent
            })
                .then((response) => {
                    navigate('/');
                })
                .catch((error) => {
                    console.log(error)
                })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <MyNavbar></MyNavbar>
            <div className="wrapper">
                <div className="box-wrapper">
                    <div className="box">
                        <h2> Ask A Question </h2>
                        <form onSubmit={onHandleSubmit}>
                            <div>
                                <input type="text" required value={hashtag} onChange={onChangeHashtag} />
                                <label>Hashtag</label>
                            </div>
                            <div>
                                <textarea required value={questioncontent} onChange={onChangeQuestion}></textarea>
                                <label>Your Question</label>
                            </div>
                            <input id="submit" type="submit" onSubmit={onHandleSubmit} />
                        </form>
                    </div>
                </div>
            </div>
            <footer class="footer">
            </footer>
        </>
    )

}

export default Create;