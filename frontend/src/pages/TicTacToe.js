import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Topbar from "../components/Topbar";
import Choice from "../components/Choice";
import Board from '../components/Board';
import Scoreboard from '../components/Scoreboard';
import Results from '../components/Results';

function TicTacToe() {
    return (
        <>
            <Topbar />
            <Choice />
        </>
        


    );
}

export default TicTacToe;