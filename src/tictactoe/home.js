import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

export default function Home() {
    return (
      <div className='center-screen'>
        <div className='components'>
            <h1>Tic Tac Toe</h1>
            <h3>Who's there?</h3>
            <Link to=''><button>One player</button></Link>
            <Link to='game'><button>Two players</button></Link>
        </div>
      </div>
    );
}