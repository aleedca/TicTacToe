import React from 'react';
import { Link } from 'react-router-dom';
import './app.css'

export default function App() {
    return (
        <div className='center-screen'>
        <div className='menu'>
            <h1>Tic Tac Toe</h1>
            <h3>Who's there?</h3>
            <button>One player</button>
            <button>Two players</button>
        </div>
        </div>
    );
}