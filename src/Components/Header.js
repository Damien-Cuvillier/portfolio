// src/components/Header.js
import React from 'react';

function Header({interactiveMode, setInteractiveMode }) {
  return (
    <header>
      <nav>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <button onClick={() => setInteractiveMode(prev => !prev)}>
        {interactiveMode ? 'Mode classique' : 'Mode interactif'}
      </button>
    </header>
  );
}

export default Header;
