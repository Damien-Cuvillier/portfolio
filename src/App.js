import React, { useState } from 'react';
import Header from './Components/Header';
import About from './Components/About';
import Projects from './Components/Projects';
import Tetris from './Components/Tetris'; 
import './App.css';
import './tailwind.css';
import ContactForm from './Components/Footer';
import Competences from './Components/Competences'
function App() {
  const [interactiveMode, setInteractiveMode] = useState(false);

  return (
    <div className="App">
      <Header interactiveMode={interactiveMode} setInteractiveMode={setInteractiveMode} />
      {interactiveMode ? (
        <Tetris />  
      ) : (
        <>
          <About />
          <Competences />
          <Projects />
          <ContactForm />
        </>
      )}
    </div>
  );
}

export default App;
