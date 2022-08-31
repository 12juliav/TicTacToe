import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Results({ endingType }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  let modalTitle;
  let modalBody;

  if(endingType === 0){
    modalTitle = <Modal.Title>Loser :&#40;</Modal.Title>
    modalBody = <Modal.Body>You lost this game of Tic-Tac-Toe.</Modal.Body>
  }
  else if(endingType === 1) {
    modalTitle = <Modal.Title>Winner!!!</Modal.Title>
    modalBody = <Modal.Body>You won this game of Tic-Tac-Toe!</Modal.Body>
  }
  else {
    modalTitle = <Modal.Title>Tie</Modal.Title>
    modalBody = <Modal.Body>You and your opponent tied in this game of Tic-Tac-Toe.</Modal.Body>
  }


    return(
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {modalTitle}
          </Modal.Header>
          {modalBody}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </> 

    );
};

export default Results;