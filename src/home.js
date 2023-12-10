import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Link } from 'react-router-dom';
import './App.css'

function Home() {
  const [visible, setVisible] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setVisible(true);
  }

  return (
    <div className='screen'>
      <div className='components'>
        <h1>Tic Tac Toe</h1>
        <h3>Who's there?</h3>
        <Link to='/'><button onClick={(e) => handleClick(e)}>One player</button></Link>
        <Link to='game'><button>Two players</button></Link>
      </div>

      <Dialog header="Sorry!!!" visible={visible} onHide={() => setVisible(false)}
        style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
        <p className="m-0">
          Esta funcionalidad no está disponible en esta versión. Pronto podrás jugar contra la computadora.
        </p>
      </Dialog>
    </div>
  );
}

export default Home;