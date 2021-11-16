import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import mainLogo from './logo-red.png';
import { useState, useEffect } from 'react';
import { BsQuestionCircleFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import BarLoader from "react-spinners/BarLoader";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import './navbar.css';
const axios = require('axios');

function MyNavbar() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const getUser = async (token) => {
        try {
            await axios.get(
                ' https://binh-ask-answer.herokuapp.com/api/user/getuser',
                {
                    headers: {
                        "auth-token": token
                    }
                }
            )
                .then((response) => {
                    var re = response.data;
                    setUser(re.user);
                    setLoading(false);
                },
                    (error) => {
                        console.log(error);
                    }
                );
        } catch (err) {
            console.log(err);
        }
    }

    const handleBookmarks = () => {
        navigate(`/bookmark/${user._id}`);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUser(token);
        } else {
            setUser(null);
        }
    }, [])

    return (
        <>
            {
                loading
                    ?
                    (<div className="loader">
                        <ClimbingBoxLoader color={`#36D7B7`} loading={loading} size={50} />
                    </div>)
                    :
                    (
                        <div>
                            <Navbar bg="dark" variant="dark">
                                <Container>
                                    <Navbar.Brand>
                                        <Link to="/" className="create-link">
                                            <img
                                                alt=""
                                                src={mainLogo}
                                                width="100"
                                                height="30"
                                                className="d-inline-block align-top"
                                            />
                                        </Link>
                                    </Navbar.Brand>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto">
                                        </Nav>
                                        <Nav>
                                            <Nav.Link ><BsQuestionCircleFill /> <Link to="/create" className="create-link">Ask</Link></Nav.Link>
                                            <NavDropdown title={user.name} id="collasible-nav-dropdown">
                                                <NavDropdown.Item onClick={handleBookmarks}>Bookmarks</NavDropdown.Item>
                                                {/* <NavDropdown.Item >MyQuestion</NavDropdown.Item> */}
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                            </NavDropdown>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container >
                            </Navbar >
                        </div >
                    )
            }
        </>
    )
}

export default MyNavbar;