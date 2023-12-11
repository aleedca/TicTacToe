import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Link } from 'react-router-dom';
import { createAudio } from '../components/AudioHelper.js';
import popSound from '../sounds/pop.wav';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/App.css'

export default function Home() {
  let clickButtonAudio = createAudio(popSound, 0.2, 1.5)
  const [visible, setVisible] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setVisible(true);
    clickButtonAudio.play();
  }

  return (
    <div className='screen'>
      <div className='components'>
        <h1>Tic Tac Toe</h1>
        <h3>Who's there?</h3>
        <Link to='/'><button onClick={(e) => handleClick(e)}>One player</button></Link>
        <Link to='game'><button onClick={() => clickButtonAudio.play()}>Two players</button></Link>
      </div>

      <Dialog header="SORRY :(" visible={visible} resizable={false} draggable={false} onHide={() => setVisible(false)}
        style={{ maxWidth: '80vw', textAlign: 'justify', minWidth: '20vh', fontSize: '1.2rem'}} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
        <p className="m-0">
          This functionality is not available in this version. Soon you will be able to play against the computer!!!
        </p>
      </Dialog>
    </div>
  );
}
