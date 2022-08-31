import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';
import Board from './Board';
import Scoreboard from './Scoreboard';
import '../styles.css';

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
                <Stack gap={4}>
                    <h3 className='choice-text text-center mt-5 pt-5'>Choose a difficulty setting and then X or O</h3> 
                    <Dropdown className='text-center' onSelect={difficultyHandler}>
                        <Dropdown.Toggle variant='dark' className='dropdown-button-size'>
                            {dropdownTitle}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as='button' eventKey='0' value='Easy' onClick={dropdownTitleHandler} className='button-size'>Easy</Dropdown.Item>
                            <Dropdown.Item as='button' eventKey='1' value='Hard' onClick={dropdownTitleHandler} className='button-size'>Hard</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Stack direction="horizontal" gap={4} className="col-md-.5 mx-auto">
                        <Button variant='dark' className='choice-button-size' onClick={xChoiceHandler}>
                            X
                        </Button>
                        <Button variant='dark' className='choice-button-size' onClick={oChoiceHandler}>
                            O
                        </Button>
                    </Stack>
                    <p className='topbar-brand text-center'>X will go first</p>    
                </Stack>
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