import React, { useState } from 'react';
import Topbar from "./components/Topbar";
import Choice from "./components/Choice";

function TicTacToe() {
    const [userId, setUserId] = useState();
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [ties, setTies] = useState(0);

    return (
        <>
            <Topbar 
                userId={userId} 
                setUserId={setUserId}
                setWins={setWins}
                setLosses={setLosses}
                setTies={setTies} />
            <Choice 
                userId={userId} 
                wins={wins}
                setWins={setWins}
                losses={losses}
                setLosses={setLosses}
                ties={ties}
                setTies={setTies} />
        </>
        


    );
}

export default TicTacToe;