import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Login from './Login';
import Register from './Register';
import '../styles.css';

function Topbar({ userId, setUserId, setWins, setLosses, setTies }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginOpen = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);
  const handleRegisterOpen = () => setShowRegister(true);
  const handleRegisterClose = () => setShowRegister(false);

  return (
    <>
      <Navbar bg="dark" variant='dark' expand="lg">
        <Navbar.Brand href="/" className='ms-3 topbar-brand'>Tic-Tac-Toe</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {!userId &&
            <Stack direction='horizontal' gap={2} className='ms-auto me-3'>
              <Button variant='secondary' onClick={handleLoginOpen} className='button-size'>
                Login
              </Button>
              <Button variant='secondary' onClick={handleRegisterOpen} className='button-size'>
                Register
              </Button>
            </Stack>
          }
          {userId &&
            <Navbar.Text className='ms-auto me-3'>
              Logged in!
            </Navbar.Text>
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