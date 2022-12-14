import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register({ show, handleClose, setUserId, setWins, setLosses, setTies }) {
    //const [show, setShow] = useState(true);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    //const handleClose = () => setShow(false);
    const usernameChangeHandler = (event) => setUsername(event.target.value);
    const passwordChangeHandler = (event) => setPassword(event.target.value);

    const base = 'https://tictactoe-julia.herokuapp.com/'

    //The register form that uses the register then login APIs
    const doRegister = async () => {
        let data = {
            username: username,
            password: password
        };

        try {
            const response = await fetch(base + 'user/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            const res = await response.json();

            if(response.status !== 200) {
                console.log("There is an error here!");
                alert('Unsuccessful Register');
                throw new Error(response.status);
            }
            else {
                console.log('Success: ' + JSON.stringify(res, null, 4));
                handleClose();
                if(res.error) {
                    alert(res.error);
                }
                else {
                    doLogin();
                }
            }
        } 
        catch(error) {
            console.error("Error:", error);
            alert('Unsuccessful Register');
            return;
        }
    }

    const doLogin = async () => {
        let data = {
            username: username,
            password: password
        };

        try {
            const response = await fetch(base + 'user/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            const res = await response.json();

            if(response.status !== 200) {
                console.log("There is an error here!");
                throw new Error(response.status);
            }
            else {
                console.log('Success: ' + JSON.stringify(res, null, 4));
                setUserId(res.userInfo._id);
                setWins(res.userInfo.Wins);
                setLosses(res.userInfo.Losses);
                setTies(res.userInfo.Ties);
            }
        } 
        catch(error) {
            console.error("Error:", error);
            return;
        }
    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" onChange={usernameChangeHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" onChange={passwordChangeHandler} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="dark" onClick={doRegister}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Register;