import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Board from './Board';
import Scoreboard from './Scoreboard';


function Choice({ userId, wins, setWins, losses, setLosses, ties, setTies }) {
    const [showBoard, setShowBoard] = useState(false);
    const [choice, setChoice] = useState();

    const xChoiceHandler = () => {
        setShowBoard(true);
        setChoice("X");
    }
    const oChoiceHandler = () => {
        setShowBoard(true);
        setChoice("O");
    }

    return (
        <>
        {!showBoard &&
             <Container fluid>
                <Stack gap={3}>
                <h3 className= 'text-center'>Choose X or O</h3> 
                    <Stack direction="horizontal" gap={3} className="col-md-.5 mx-auto">
                        <Button onClick={xChoiceHandler}>
                            X
                        </Button>
                        <Button onClick={oChoiceHandler}>
                            O
                        </Button>
                    </Stack>
                </Stack>
            <p className='text-center'>X will go first</p>    
            </Container>
        }
            
        {showBoard && 
            <>
                <Board 
                    choice={choice}
                    userId={userId}
                    wins={wins}
                    setWins={setWins}
                    losses={losses}
                    setLosses={setLosses}
                    ties={ties}
                    setTies={setTies}
                    setShowBoard={setShowBoard} />
                <Scoreboard 
                    wins={wins}
                    losses={losses}
                    ties={ties} />
            </>
        }
        </>
        
    );

};

export default Choice;