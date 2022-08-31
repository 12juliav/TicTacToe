import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, {useState, useEffect} from 'react';
import Results from './Results';
import "../styles.css";

function Board({ choice, wins, setWins, losses, setLosses, ties, setTies }) {
    const [boardStorage, setBoardStorage] = useState([]);
    const [boardStorage3x3, setBoardStorage3x3] = useState();
    const [isComputerTurn, setIsComputerTurn] = useState(false);
    const [boardSquaresFilled, setBoardSquaresFilled] = useState(0);
    const [gameEnded, setGameEnded] = useState(false);
    const [endingType, setEndingType] = useState();
    
    let humanInt = (choice === "X") ? 1 : 0;
    let computerInt = (choice === "X") ? 0 : 1;
    
    const computerPlayer = () => {
        setIsComputerTurn(false);
        
        while(1){
            let random = Math.floor(Math.random() * 9);
            if(boardStorage[random].value === -1){
                updateBoardStorageHandler(computerInt, random);
                break;
            }
        }
    }

    const humanPlayer = (buttonLocation) => {
        setIsComputerTurn(true);
        updateBoardStorageHandler(humanInt, buttonLocation);
    }

    const initBoardStorage = () => {
        for(let i = 0; i < 9; i++) {
            boardStorage.push({
                value: -1,
                location: i
            })
        }
    }

    const create3x3 = (arr) => {
        var cache = [];
        const temp = [...arr];
        while (temp.length) {
            cache.push(temp.splice(0, 3));
        } 
        setBoardStorage3x3(cache);
    }

    const updateBoardStorageHandler = (value, location) => {
        const updatedButton = {
            value: value,
            location: location
        }

        const updatedBoard = boardStorage.map((boardButton) =>
            boardButton.location === location ? updatedButton : boardButton
        );
        setBoardStorage(updatedBoard);
        setBoardSquaresFilled(boardSquaresFilled + 1);
    }

    const calcWinner = () => {
        const winConditions = [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for(let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            if(boardStorage[a].value !== -1 && boardStorage[b].value !== -1 && boardStorage[c].value !== -1) {
                if((boardStorage[a].value === boardStorage[b].value) && (boardStorage[a].value === boardStorage[c].value)) {
                    if(boardStorage[a].value === humanInt) {
                        console.log(humanInt);
                        setEndingType(1);
                        setWins(wins + 1)
                        return 1;
                    }
                    else {
                        console.log(humanInt);
                        setEndingType(0);
                        setLosses(losses + 1)
                        return 0;
                    }
                }
            }
        }
        return -1;
    }

    const resetGame = () => {
        localStorage.setItem('wins', wins);
        localStorage.setItem('losses', losses);
        localStorage.setItem('ties', ties);
        window.location = '/';
    }

    useEffect(() => {
        initBoardStorage();
        if(choice === "O"){
            computerPlayer();
        }
    }, []);

    useEffect(() => {
        if(boardStorage.length !== 0) {
            create3x3(boardStorage);

            let winner = calcWinner();
            if(winner === 1 || winner === 0) {
                setGameEnded(true);
            }
            else {
                if(isComputerTurn && (boardSquaresFilled !== 9)) {
                    computerPlayer();
                }
                if(boardSquaresFilled === 9) {
                    setGameEnded(true)
                    setEndingType(2);
                    setTies(ties + 1);
                }
            }
        }
 
    }, [boardStorage]);

  return (
    <>
    <Container>
        <ButtonGroup vertical>
            {boardStorage3x3 &&
                boardStorage3x3.map((boardStorageChunk, index) => {
                    const boardRows = boardStorageChunk.map((boardButton) => {
                        let element;
                        if(boardButton.value === -1) {
                            element = <button key={boardButton.location} className='board-button-size' onClick={() => humanPlayer(boardButton.location)}><span className='blank-text'>a</span></button>
                        }
                        else if(boardButton.value === 0) {
                            element = <button key={boardButton.location} className='board-button-size' disabled>O</button>
                        }
                        else {
                            element = <button key={boardButton.location} className='board-button-size' disabled>X</button>
                        }
                        return(
                            element
                        );
                    })
                    return (                        
                        <ButtonGroup key={index}>
                            {boardRows}
                        </ButtonGroup>
                    );
                }) 
            }
        </ButtonGroup>
        <Button onClick={resetGame}>Reset Game</Button>
    </Container>
    {gameEnded &&
        <Results endingType={endingType}/>
    }
    </>
  );
}

export default Board;