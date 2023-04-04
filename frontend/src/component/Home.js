import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div>
      <h1>Bienvenido a la pantalla de inicio</h1>
      <div className='button-container'>
      <Link to="/formulario">
        <button>Agregar prospecto</button>
        </Link>
        <button>Prospecto</button>
      </div>
  
    </div>
  );
}

export default Home;

