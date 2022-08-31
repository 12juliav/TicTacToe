import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';
import Board from './Board';
import Scoreboard from './Scoreboard';

function Choice({ userId, wins, setWins, losses, setLosses, ties, setTies }) {
    const [showBoard, setShowBoard] = useState(false);
    const [difficulty, setDifficulty] = useState(-1);
    const [choice, setChoice] = useState();
    const [dropdownTitle, setDropdownTitle] = useState('Difficulty');

    const xChoiceHandler = () => {
        if(difficulty !== -1) {
            setShowBoard(true);
            setChoice("X");
        }
        else {
            alert('Please choose a difficulty first')
        }
    }
    const oChoiceHandler = () => {
        if(difficulty !== -1) {
            setShowBoard(true);
            setChoice("O");
        }
        else {
            alert('Please choose a difficulty first')
        }
    }

    const difficultyHandler = (diff) => {
        setDifficulty(diff);
    }

    const dropdownTitleHandler = (event) => {
        setDropdownTitle(event.target.value);
    }

    return (
        <>
        {!showBoard &&
             <Container fluid>
                <Stack gap={3}>
                <h3 className= 'text-center'>Choose a difficulty setting and then X or O</h3> 
                <Dropdown className='text-center' onSelect={difficultyHandler}>
                    <Dropdown.Toggle>
                        {dropdownTitle}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as='button' eventKey='0' value='Easy' onClick={dropdownTitleHandler}>Easy</Dropdown.Item>
                        <Dropdown.Item as='button' eventKey='1' value='Hard' onClick={dropdownTitleHandler}>Hard</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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
            <Stack className='text-center' gap={3}>
                <Board 
                    choice={choice}
                    userId={userId}
                    wins={wins}
                    setWins={setWins}
                    losses={losses}
                    setLosses={setLosses}
                    ties={ties}
                    setTies={setTies}
                    setShowBoard={setShowBoard}
                    difficulty={difficulty} />
                <Scoreboard 
                    wins={wins}
                    losses={losses}
                    ties={ties} />
            </Stack>
        }
        </>
    );

};

export default Choice;