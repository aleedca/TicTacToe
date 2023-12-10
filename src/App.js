import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './home.js';
import Game from './game.js';
import './App.css'

export default function App() {
    return (
        <Router basename="/TicTacToe">
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </Router>
    );
}