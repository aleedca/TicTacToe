import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { createAudio } from '../components/AudioHelper.js';
import popSound from '../sounds/pop.wav';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/App.css'

export default function Home() {
  const navigate = useNavigate();
  let clickButtonAudio = createAudio(popSound, 0.2, 1.5)
  let [visible, setVisible] = useState(false);
  let [dialogContent, setDialogContent] = useState({header: '', text: ''});

  const handleClick = (e, playerMode) => {
    e.preventDefault();
    clickButtonAudio.play();

    if (playerMode === 'onePlayer') {
      setDialogContent({header: 'Sad announcement :(', text: 'Im sorry to mention that this functionality is not working yet. Soon you will be able to play against an AI!!! Be ready!!!😎'});
      setVisible(true);
    } else {
      navigate('/game', { state: { playerMode } });
    }
  }

  return (
    <div className='screen'>
      <div className='components'>
        <h1>Tic Tac Toe</h1>
        <h2>Who's there?</h2>
        <div className='container-buttons'>
          <button onClick={(e) => handleClick(e, 'onePlayer')}>One player</button>
          <button onClick={(e) => handleClick(e,'twoPlayers')}>Two players</button>
        </div>
        <h3 onClick={() => {setVisible(true); setDialogContent({header: 'Hello there :)', text: <span>Hope you have fun playing this Tic Tac Toe I made!!! If you want to see more of my stuff, then check out my <a href="https://github.com/aleedca" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary-color-200)' }}>github profile</a>.
          <br/>- Sincerely, alexia✨</span>})}}><u>About me</u></h3>
      </div>

      <Dialog header={dialogContent.header} visible={visible} resizable={false} draggable={false} onHide={() => setVisible(false)}
        style={{ maxWidth: '40vw', textAlign: 'justify', minWidth: '30vh', fontSize: '1.2rem' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
        <p className="m-0">
          {dialogContent.text}
        </p>
      </Dialog>
    </div>
  );
}
