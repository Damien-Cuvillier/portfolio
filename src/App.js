import React, { useState, Suspense, lazy } from 'react';
import Header from './Components/Header';
import Projects from './Components/Projects';
import Tetris from './Components/Tetris';
import './App.css';
import './tailwind.css';
import ContactForm from './Components/Footer';
import Competences from './Components/Competences';
import About from './Components/About'

const SVGComponent = lazy(() => import('./Components/SliderSVG'));

function App() {
  const [interactiveMode, setInteractiveMode] = useState(false);

  return (
    <div className="App">
      <Header interactiveMode={interactiveMode} setInteractiveMode={setInteractiveMode} />
      {interactiveMode ? (
        <Tetris />
      ) : (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <SVGComponent />
          </Suspense>
          
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
