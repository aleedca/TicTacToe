import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cross from '../assets/cross.png';
import circle from '../assets/circle.png';
import confetti from "canvas-confetti";
import { createAudio } from '../components/AudioHelper.js';
import popSound from '../sounds/pop.wav';
import winSound from '../sounds/win.wav';
import drawSound from '../sounds/draw.wav';
import '../styles/App.css'

let data = ["", "", "", "", "", "", "", "", ""];

export default function Game() {
    const navigate = useNavigate();
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let [winner, setWinner] = useState(null);
    let [isModalVisible, setIsModalVisible] = useState(false);
    let clickButtonAudio = createAudio(popSound, 0.2, 1.5);
    let winAudio = createAudio(winSound, 0.4, 1);
    let drawAudio = createAudio(drawSound, 0.4, 1);

    // handle the click event of each square of the board
    const handleClick = (event, num) => {
        event.preventDefault();

        // check if the board is locked
        if (lock) {
            return 0;
        }

        // check if the count is odd and if the square in data is empty then add a cross
        if (count % 2 !== 0 && data[num] === '') {
            event.target.innerHTML = `<img src='${cross}' class='fade-in' alt=''>`;
            data[num] = 'X';
            setCount(++count);
        }

        // check if the count is even and if the square in data is empty then add a circle
        if (count % 2 === 0 && data[num] === '') {
            event.target.innerHTML = `<img src='${circle}' class='fade-in' alt=''>`;
            data[num] = 'O';
            setCount(++count);
        }

        checkWinner();
    }


    // handle the click event of the restart button
    const handleRestart = (e, selection) => {
        e.preventDefault();
        clickButtonAudio.play();
        data = ["", "", "", "", "", "", "", "", ""];
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
        if (data[0] === data[1] && data[1] === data[2] && data[0] !== '') {
            won(data[0]);
        } else if (data[3] === data[4] && data[4] === data[5] && data[3] !== '') {
            won(data[3]);
        } else if (data[6] === data[7] && data[7] === data[8] && data[6] !== '') {
            won(data[6]);
        } else if (data[0] === data[3] && data[3] === data[6] && data[0] !== '') {
            won(data[0]);
        } else if (data[1] === data[4] && data[4] === data[7] && data[1] !== '') {
            won(data[1]);
        } else if (data[2] === data[5] && data[5] === data[8] && data[2] !== '') {
            won(data[2]);
        } else if (data[0] === data[4] && data[4] === data[8] && data[0] !== '') {
            won(data[0]);
        } else if (data[2] === data[4] && data[4] === data[6] && data[2] !== '') {
            won(data[2]);
        } else if (count === 9) {
            won('D'); // if there is no winner and the count is 9 then it is a draw
        }
    }

    // update the state of 'winner' in this function
    const won = (winner) => {
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

    // show the modal when the game is over
    // the usecallback hook is used to prevent the function from being created every time the component renders

    // check if there is a winner after each render having a dependency of the state of 'winner'
    // it first checks if there is a winner and then lock the board and show the winner
    useEffect(() => {
        if (winner) {
            setLock(true);
        }
    }, [winner]);

    // render the game board
    return (
        <div className='screen'>
            <div className='components' id='content'>
                <h1>Tic Tac Toe</h1>
                <div className='board'>
                    <div className='column'>
                        <div className='square' onClick={(e) => { handleClick(e, 0) }}></div>
                        <div className='square' onClick={(e) => { handleClick(e, 1) }}></div>
                        <div className='square' onClick={(e) => { handleClick(e, 2) }}></div>
                    </div>
                    <div className="column">
                        <div className='square' onClick={(e) => { handleClick(e, 3) }}></div>
                        <div className='square' onClick={(e) => { handleClick(e, 4) }}></div>
                        <div className='square' onClick={(e) => { handleClick(e, 5) }}></div>
                    </div>
                    <div className="column">
                        <div className='square' onClick={(e) => { handleClick(e, 6) }}></div>
                        <div className='square' onClick={(e) => { handleClick(e, 7) }}></div>
                        <div className='square' onClick={(e) => { handleClick(e, 8) }}></div>
                    </div>
                </div>
                <Link to='/'><button onClick={(e) => handleRestart(e, 0)}>Restart</button></Link>
            </div>
            {isModalVisible && (
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
                    <Link to='/'><button onClick={(e) => handleRestart(e, 1)}>Go back</button></Link>
                </div>
            )}
        </div>
    );
}
