import React from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import '../styles.css';

function Scoreboard({ wins, losses, ties }) {

    return(
        <Container className='scoreboard mt-3'>
            <ListGroup variant='flush'>
                <ListGroup.Item className='fw-bold'>Your Score</ListGroup.Item>
                <ListGroup.Item>Wins: {wins}</ListGroup.Item>
                <ListGroup.Item>Losses: {losses}</ListGroup.Item>
                <ListGroup.Item>Ties: {ties}</ListGroup.Item>
            </ListGroup>
        </Container>
        
    );
} ;

export default Scoreboard;