import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login({ show, handleClose, setUserId, setWins, setLosses, setTies }) {
    //const [show, setShow] = useState(true);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    //const handleClose = () => setShow(false);
    const usernameChangeHandler = (event) => setUsername(event.target.value);
    const passwordChangeHandler = (event) => setPassword(event.target.value);

    const doLogin = async () => {
        const base = 'https://tictactoe-julia.herokuapp.com/'

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
                alert('Unsuccessful Login');
                throw new Error(response.status);
            }
            else {
                console.log('Success: ' + JSON.stringify(res, null, 4));
                handleClose();
                if(res.success) {
                    setUserId(res.userInfo._id);
                    setWins(res.userInfo.Wins);
                    setLosses(res.userInfo.Losses);
                    setTies(res.userInfo.Ties);
                }
                else {
                    alert('Invalid Login');
                }
            }
        } 
        catch(error) {
            console.error("Error:", error);
            alert('Unsuccessful Login');
            return;
        }
    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
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
                <Button variant="primary" onClick={doLogin}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Login;