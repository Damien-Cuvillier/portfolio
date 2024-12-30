import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './Components/Header';
import Projects from './Components/Projects';
import Tetris from './Components/Tetris';
import './App.css';
import './tailwind.css';
import './styles/fullpage.css';
import ContactForm from './Components/Footer';
import Competences from './Components/Competences';
import About from './Components/About';
import FullPageScroll from './Components/FullPageScroll';

const SVGComponent = lazy(() => import('./Components/SliderSVG'));

function App() {
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const MainContent = () => (
    <>
      <Header 
        interactiveMode={interactiveMode} 
        setInteractiveMode={setInteractiveMode}
        currentPage={currentPage}
        onNavigate={handlePageChange}
      />
      <FullPageScroll
        currentPage={currentPage}
        onPageChange={handlePageChange}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <SVGComponent />
        </Suspense>
        <About />
        <Competences />
        <Projects />
        <ContactForm />
      </FullPageScroll>
    </>
  );

  return (
    <div className="App">
      {interactiveMode ? (
        <>
          <Header 
            interactiveMode={interactiveMode} 
            setInteractiveMode={setInteractiveMode}
            currentPage={currentPage}
            onNavigate={handlePageChange}
          />
          <Tetris />
        </>
      ) : (
        <MainContent />
      )}
    </div>
  );
}

export default App;