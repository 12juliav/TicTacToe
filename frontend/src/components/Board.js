import React, {useState, useEffect} from 'react';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Results from './Results';
import "../styles.css";

function Board({ choice, userId, wins, setWins, losses, setLosses, ties, setTies, setShowBoard, difficulty }) {
    const [boardStorage, setBoardStorage] = useState([]);
    const [boardStorage3x3, setBoardStorage3x3] = useState();
    const [isComputerTurn, setIsComputerTurn] = useState(false);
    const [boardSquaresFilled, setBoardSquaresFilled] = useState(0);
    const [gameEnded, setGameEnded] = useState(false);
    const [endingType, setEndingType] = useState();
    const [turnCount, setTurnCount] = useState(0);
    
    let humanInt = (choice === "X") ? 1 : 0;
    let computerInt = (choice === "X") ? 0 : 1;
    
    const computerPlayer = () => {
        setIsComputerTurn(false);
        setTurnCount(turnCount + 1);
        
        if(difficulty == 0) {
            while(1){
                if(boardStorage.length !== 0) {
                    let random = Math.floor(Math.random() * 9);
                    if(boardStorage[random].value === -1){
                        updateBoardStorageHandler(computerInt, random);
                        break;
                    } 
                }
            }
        }
        else {
            if(turnCount === 0 ) {
                updateBoardStorageHandler(computerInt, 0);
            }
            else if(turnCount === 1) {
                if(boardStorage[0].value === 1 || boardStorage[2].value === 1 || boardStorage[6].value === 1 || boardStorage[8].value === 1) {
                    updateBoardStorageHandler(computerInt, 4);
                }
                else {
                    updateBoardStorageHandler(computerInt, 0);
                }
            }
            else if(turnCount === 2) {
                if(boardStorage[2].value === -1) {
                    updateBoardStorageHandler(computerInt, 2);
                }
                else if(boardStorage[6].value === -1) {
                    updateBoardStorageHandler(computerInt, 6);
                }
                else if(boardStorage[8].value === -1) {
                    updateBoardStorageHandler(computerInt, 8);
                }
            }
            else if(turnCount >= 3) {
                let isAlmostWinner = calcAlmostWinner();
                if(isAlmostWinner !== -1) {
                    updateBoardStorageHandler(computerInt, isAlmostWinner);
                }
                else {
                    while(1){
                        if(boardStorage.length !== 0) {
                            let random = Math.floor(Math.random() * 9);
                            if(boardStorage[random].value === -1){
                                updateBoardStorageHandler(computerInt, random);
                                break;
                            } 
                        }
                    }
                }
            }
        }
    }

    const humanPlayer = (buttonLocation) => {
        setIsComputerTurn(true);
        setTurnCount(turnCount + 1);
        updateBoardStorageHandler(humanInt, buttonLocation);
    }

    const initBoardStorage = () => {
        let tempArr = [];
        for(let i = 0; i < 9; i++) {
            tempArr.push({
                value: -1,
                location: i
            })
        }
        setBoardStorage(tempArr);
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

    const updateScore = async (scoreType) => {
        const base = 'https://tictactoe-julia.herokuapp.com/'

        let data = {
            userID: userId,
            score: scoreType
        };

        try {
            const response = await fetch(base + 'user/UpdateScore', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            const res = await response.json();

            if(response.status !== 200) {
                console.log("There is an error here!");
                throw new Error(response.status);
            }
            else {
                console.log('Success: ' + JSON.stringify(res, null, 4));
            }
        } 
        catch(error) {
            console.error("Error:", error);
            return;
        }
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
                        setEndingType(1);
                        if(userId) {
                            updateScore(1);
                        }
                        setWins(wins + 1)
                        return 1;
                    }
                    else {
                        setEndingType(0);
                        if(userId) {
                            updateScore(0);
                        }
                        setLosses(losses + 1)
                        return 0;
                    }
                }
            }
        }
        return -1;
    }

    const calcAlmostWinner = () => {
        const almostWinConditions = [
            [0, 1, 2],
            [1, 2, 0],
            [3, 4, 5],
            [4, 5, 3],
            [6, 7, 8],
            [7, 8, 6],
            [0, 2, 1],
            [3, 5, 4],
            [6, 8, 7],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 0],
            [4, 7, 1],
            [5, 8, 2],
            [0, 4, 8],
            [4, 8, 0],
            [2, 4, 6],
            [4, 6, 2]

        ];

        for(let i = 0; i < almostWinConditions.length; i++) {
            const [a, b, c] = almostWinConditions[i];
            if(boardStorage[a].value !== -1 && boardStorage[b].value !== -1) {
                if(boardStorage[a].value === boardStorage[b].value) {
                    if(boardStorage[c].value === -1) {
                        return c;
                    }
                }
            }
        }
        return -1;
    }

    const resetGame = () => {
        setShowBoard(false);
    } 

    useEffect(() => {
        initBoardStorage();
    }, []);

    useEffect(() => {
        if(boardStorage.length !== 0) {
            if(boardSquaresFilled === 0 && choice === 'O') {
                computerPlayer();
            }

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
                    if(userId) {
                        updateScore(2);
                    }
                    setTies(ties + 1);
                }
            }
        }
    }, [boardStorage]);

  return (
    <>
    <Container className='mt-5'>
        <Stack gap={3}>
            <div className='text-center'>
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
            </div>
            <div className='text-center'>
                <Button variant='dark' onClick={resetGame} className='topbar-buttons'>Reset Game</Button>
            </div>
        </Stack>
    </Container>
    {gameEnded &&
        <Results endingType={endingType}/>
    }
    </>
  );
}

export default Board;