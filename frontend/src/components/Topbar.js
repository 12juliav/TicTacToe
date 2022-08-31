import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Login from './Login';
import Register from './Register';

function Topbar({ userId, setUserId, setWins, setLosses, setTies }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginOpen = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);
  const handleRegisterOpen = () => setShowRegister(true);
  const handleRegisterClose = () => setShowRegister(false);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Tic-Tac-Toe</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {!userId &&
            <Stack direction='horizontal' gap={2} className='ms-auto'>
              <Button onClick={handleLoginOpen}>
                Login
              </Button>
              <Button onClick={handleRegisterOpen}>
                Register
              </Button>
            </Stack>
          }
        </Navbar.Collapse>
      </Navbar>

      <Login 
        show={showLogin} 
        handleClose={handleLoginClose} 
        setUserId={setUserId}
        setWins={setWins}
        setLosses={setLosses}
        setTies={setTies} />
      <Register 
        show={showRegister} 
        handleClose={handleRegisterClose} 
        setUserId={setUserId} 
        setWins={setWins}
        setLosses={setLosses}
        setTies={setTies} />
    </>
  );
};

export default Topbar;