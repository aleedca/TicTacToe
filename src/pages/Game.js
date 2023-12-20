import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createAudio } from '../components/AudioHelper.js';
import cross from '../assets/cross.png';
import circle from '../assets/circle.png';
import confetti from "canvas-confetti";
import popSound from '../sounds/pop.wav';
import winSound from '../sounds/win.wav';
import drawSound from '../sounds/draw.wav';
import '../styles/App.css'

export default function Game() {
    const navigate = useNavigate();
    const location = useLocation();
    const playerMode = location.state.playerMode;
    const [isModalVisible, setIsModalVisible] = useState(false);

    const clickButtonAudio = createAudio(popSound, 0.2, 1.5);
    const winAudio = createAudio(winSound, 0.4, 1);
    const drawAudio = createAudio(drawSound, 0.4, 1);

    const [board, setBoard] = useState(Array(9).fill(''));
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [winner, setWinner] = useState(null);

    const handlePlayerMove = (event, num) => {
        event.preventDefault();

        if (lock || board[num] !== '') {
            return 0;
        } else if (count % 2 === 0) {
            event.target.innerHTML = `<img src='${cross}' class='fade-in' alt=''>`;
            board[num] = 'X';
        } else if (count % 2 !== 0) {
            event.target.innerHTML = `<img src='${circle}' class='fade-in' alt=''>`;
            board[num] = 'O';

        }
        setBoard(board);
        setCount(count + 1);
        checkWinner();
    }

    const handleAIMove = () => {
        console.log("AI is thinking");

        let emptySquares = getEmptySquares();

        if (!emptySquares.length) return; // if there are no empty squares, return

        let randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];

        let squares = document.querySelectorAll('.square');

        setTimeout(() => {
            board[randomSquare] = 'O';
            setBoard(board);
            setCount(count + 1);
            squares[randomSquare].innerHTML = `<img src='${circle}' class='fade-in' alt=''>`;
            if (playerMode === 'onePlayer') {
                checkWinner(); // call checkWinner after the AI has made its move
            }
        }, 800);
    }

    // get all the empty squares of the board
    const getEmptySquares = () => {
        let emptySquare = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                emptySquare.push(i);
            }
        }
        return emptySquare;
    }

    // handle the click event of the restart button
    const handleRestartBack = (selection) => {
        clickButtonAudio.play();
        setBoard(Array(9).fill(''));
        setCount(0);
        setLock(false);
        setWinner(null);
        setIsModalVisible(false);

        let squares = document.querySelectorAll('.square'); // get all the components that has .square of the board and store them in the squares array
        squares.forEach(square => { // clear the content of each square
            square.innerHTML = '';
        });


        if (selection === 1) { // if the user clicks on the go back button then navigate to the home page
            confetti.reset();
            navigate('/');
        }
    }

    // check if there is a winner in the game and return the last player
    const checkWinner = () => {
        if (board[0] === board[1] && board[1] === board[2] && board[2] !== '') {
            won(board[2]);
        } else if (board[3] === board[4] && board[4] === board[5] && board[3] !== '') {
            won(board[3]);
        } else if (board[6] === board[7] && board[7] === board[8] && board[6] !== '') {
            won(board[6]);
        } else if (board[0] === board[3] && board[3] === board[6] && board[0] !== '') {
            won(board[0]);
        } else if (board[1] === board[4] && board[4] === board[7] && board[1] !== '') {
            won(board[1]);
        } else if (board[2] === board[5] && board[5] === board[8] && board[2] !== '') {
            won(board[2]);
        } else if (board[0] === board[4] && board[4] === board[8] && board[0] !== '') {
            won(board[0]);
        } else if (board[2] === board[4] && board[4] === board[6] && board[2] !== '') {
            won(board[2]);
        } else if (board.every(square => square !== '')) {
            console.log("drawww", count);
            won('D'); // if there is no winner and the count is 9 then it is a draw
        }
    }

    // update the state of 'winner' in this function and show the modal
    const won = (winner) => {
        setWinner(winner);
        setTimeout(() => {
            document.getElementById('content').style.filter = "blur(10px)";
            setIsModalVisible(true);
            if (winner === 'D') {
                drawAudio.play();
            } else if (winner !== 'D') {
                winAudio.play();
                confetti({ particleCount: 500, spread: 200, origin: { y: 0.5 } });
            }
        }, 600);
    }

    // check if there is a winner after each render with a dependency of the state of 'winner'
    useEffect(() => {
        if (winner) {
            setLock(true);
        }
    }, [winner]);

    // add event listener to each square after each render with a dependency of the change of 'playerMode'
    useEffect(() => {
        if (playerMode === 'onePlayer') {
            let squares = document.querySelectorAll('.square'); // get all squares
            squares.forEach((square, num) => { // add event listener to each square
                square.addEventListener('click', (event) => handlePlayerMove(event, num));
            });
        }
    }, [playerMode]);

    // render the game board
    return (
        <div className='screen'>
            <div className='components' id='content'>
                <h1>Tic Tac Toe</h1>
                <div className='board'>
                    <div className='column'>
                        <div className='square' onClick={(e) => { handlePlayerMove(e, 0) }}></div>
                        <div className='square' onClick={(e) => { handlePlayerMove(e, 1) }}></div>
                        <div className='square' onClick={(e) => { handlePlayerMove(e, 2) }}></div>
                    </div>
                    <div className="column">
                        <div className='square' onClick={(e) => { handlePlayerMove(e, 3) }}></div>
                        <div className='square' onClick={(e) => { handlePlayerMove(e, 4) }}></div>
                        <div className='square' onClick={(e) => { handlePlayerMove(e, 5) }}></div>
                    </div>
                    <div className="column">
                        <div className='square' onClick={(e) => { handlePlayerMove(e, 6) }}></div>
                        <div className='square' onClick={(e) => { handlePlayerMove(e, 7) }}></div>
                        <div className='square' onClick={(e) => { handlePlayerMove(e, 8) }}></div>
                    </div>
                </div>
                <div className='container-buttons'>
                    <button onClick={() => handleRestartBack(0)}>Restart</button>
                </div>
            </div>
            {isModalVisible && winner && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='content'>
                            {winner === 'D' ? (
                                <h1>Draw <img src={cross} alt='' /> <img src={circle} alt='' /></h1>
                            ) : (
                                <h1>Player {winner === 'X' ? <img src={cross} alt='' /> : <img src={circle} alt='' />} wins</h1>
                            )}
                        </div>
                    </div>
                    <button onClick={() => handleRestartBack(1)}>Go back</button>
                </div>
            )}
        </div>
    );
}
