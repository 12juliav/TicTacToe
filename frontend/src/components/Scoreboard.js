import React from 'react';
import Container from 'react-bootstrap/Container';

function Scoreboard({ wins, setWins, losses, setLosses, ties, setTies }) {

    return(
        <Container>
            <p>Your score!</p>
            <p>Wins: {wins}</p>
            <p>Losses: {losses}</p>
            <p>Ties: {ties}</p>
        </Container>
        
    );
} ;

export default Scoreboard;