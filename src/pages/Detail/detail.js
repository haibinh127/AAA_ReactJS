import MyNavbar from "../../components/navbar/navbar";
import { Form, FloatingLabel, Button, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import Answer from "../../components/answer/answercard";
import { useNavigate } from 'react-router-dom';
import './detail.css';

const axios = require('axios');

function Detail() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [detailpost, setDetailpost] = useState('');
    const [answers, setAnswers] = useState([]);
    const [name, setName] = useState('');
    const [answer, setAnswer] = useState('');
    const [user, setUser] = useState(null);
    const [like, setLike] = useState('');
    const [user_id, setUser_id] = useState('');
    const [question_id, setQuestion_id] = useState('');

    // const [data, setData] = useState([]);
    // const [unlike, setUnlike] = useState('');

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
                    const userId = response.data.user
                    console.log(userId._id);
                    setUser(response.data.user);
                    setUser_id(userId._id);
                    // checkId();
                },
                    (error) => {
                        var status = error.response.status
                        console.log(status);
                    }
                );
        } catch (err) {
            console.log(err);
        }
    }

    const getDetailpost = async () => {
        try {
            await axios.get(`https://binh-ask-answer.herokuapp.com/api/question/${id}`)
                .then((post) => {
                    const userId = post.data.user_id;
                    console.log(userId._id);
                    setName(post.data.user_id);
                    setDetailpost(post.data);
                    setQuestion_id(userId._id);
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    const getAnswers = async () => {
        try {
            await axios.get(`https://binh-ask-answer.herokuapp.com/api/answer/${id}`)
                .then((answers) => {
                    setAnswers(answers.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    const onChangeAnswer = (e) => {
        setAnswer(e.target.value);
    }

    const onHandleAnswer = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://binh-ask-answer.herokuapp.com/api/answer/create',
                {
                    user_id: user._id,
                    question_id: id,
                    answer_content: answer
                })
                .then(async (response) => {
                    console.log(response);
                    await getAnswers();
                })
                .catch((error) => {
                    console.log(error);
                })

        } catch (error) {
            console.log(error);
        }
    }


    const getLike = async () => {
        try {
            await axios.get(`https://binh-ask-answer.herokuapp.com/api/like/${id}`)
                .then((like) => {
                    console.log(like);
                    setLike(like.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    // const getAllLikeByUser = async () => {
    //     try {
    //         await axios.get(`http://localhost:1207/api/like/getalllike/${user_id}`)
    //             .then((allLike) => {
    //                 console.log(allLike);
    //                 setData(allLike);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const checkId = () => {
    //     // for (let i = 0; i < data.length; i++) {
    //     //     if (data[i]._userid === user_id) {
    //     //         setUnlike('Liked');
    //     //     } else {
    //     //         setUnlike('Like');
    //     //     }
    //     // }
    //     console.log(data);
    // }

    const onHandleDelete = () => {
        let x = window.confirm("Do you want to delete this question");
        if (x) {
            deleteQuestion();
        } else {
            alert("Canceled");
        }
    }

    const deleteQuestion = async () => {
        try {
            await axios.put(`https://binh-ask-answer.herokuapp.com/api/question/delete/${id}`, {
                user_id: user_id
            })
                .then((response) => {
                    navigate('/');
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    // const getBookMark = () => {

    // }

    const onHandleLike = async () => {
        try {
            axios.post('https://binh-ask-answer.herokuapp.com/api/like/likequestion', {
                user_id: user_id,
                question_id: id
            })
                .then((response) => {
                    console.log(response);
                    getLike();
                })
                .catch((error) => {
                    console.log(error);
                    alert("You already like this question");
                })
        } catch (error) {
            console.log(error)
        }
    }

    const onHandleBookmark = () => {
        try {
            axios.post('https://binh-ask-answer.herokuapp.com/api/bookmark/bookmarkquestion', {
                user_id: user_id,
                question_id: id
            })
                .then((response) => {
                    console.log(response);
                    alert("Bookmark success !");
                })
                .catch((error) => {
                    console.log(error);
                    alert("You already bookmark this question !");
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUser(token);
        } else {
            setUser(null);
        }
        getDetailpost();
        getAnswers();
        getLike();
    }, [])

    return (
        <>
            <MyNavbar></MyNavbar>
            <div className="detailcontainer">
                <div className="detailwrapper">
                    <Card style={{ width: '45rem', height: '10rem' }}>
                        <Card.Body>
                            <Card.Title style={{ fontSize: "30px" }} className="title">{detailpost.question_content}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Author: {name.name} </Card.Subtitle>
                            <div> {like}</div>
                        </Card.Body>
                        <div className="buttoncontainer">
                            <Button variant="link" onClick={onHandleLike}>Like</Button>
                            <Button variant="link" onClick={onHandleBookmark}>Bookmark</Button>
                            {
                                user_id === question_id && <Button variant="link" onClick={onHandleDelete}>Delete</Button>
                            }
                        </div>
                    </Card>
                    <div>
                        <h3>Give your answer: </h3>
                    </div>
                    <Form onSubmit={onHandleAnswer} style={{ width: '45rem' }}>
                        <FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
                            <Form.Control value={answer} onChange={onChangeAnswer} as="textarea" placeholder="Leave a comment here" />
                        </FloatingLabel>
                        <Button className="answerbutton" variant="primary" type="submit" onSubmit={onHandleAnswer}>
                            Answer
                        </Button>
                    </Form>
                    <div>
                        {
                            answers.map((value, index) => {
                                return (
                                    <Answer
                                        key={index}
                                        content={value.answer_content}
                                        author={value.user_id.name}
                                    ></Answer>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail;