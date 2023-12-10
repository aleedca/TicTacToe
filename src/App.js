import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './tictactoe/home';
import Game from './tictactoe/game';
import './App.css'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </Router>
    );
}