// src/Components/TetrisComponent.js
import React, { useState } from 'react';
import Tetris from 'react-tetris';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowRight, faArrowLeft, faArrowDown, faGamepad} from '@fortawesome/free-solid-svg-icons';
import '../App.css'

// Style pour la modale
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    
  },
};

Modal.setAppElement('#root'); // Pour l'accessibilité

const TetrisComponent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gameController, setGameController] = useState(null);
  const [gameState, setGameState] = useState(null);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="tetris-container">
      <h2 className='text-2xl font-bold text-gray-800 px-5 py-5'>
        <FontAwesomeIcon icon={faGamepad} /> Tetris Game <FontAwesomeIcon icon={faGamepad} />
      </h2>
      <Tetris
        keyboardControls={{
          down: 'MOVE_DOWN',
          left: 'MOVE_LEFT',
          right: 'MOVE_RIGHT',
          space: 'HARD_DROP',
          z: 'FLIP_COUNTERCLOCKWISE',
          x: 'FLIP_CLOCKWISE',
          up: 'FLIP_CLOCKWISE',
          p: 'TOGGLE_PAUSE',
          c: 'HOLD',
          shift: 'HOLD',
        }}
      >
        {({
          HeldPiece,
          Gameboard,
          PieceQueue,
          points,
          linesCleared,
          state,
          controller,
        }) => {
          // Mise à jour de l'état du contrôleur et de l'état du jeu
          if (gameController !== controller) setGameController(controller);
          if (gameState !== state) setGameState(state);

          // Ouvrir la modale si le jeu est perdu
          if (state === 'LOST' && !modalIsOpen) {
            setModalIsOpen(true);
          }

          return (
            <div className="tetris-game">
              <div className="points">
                <div>
                  <p>Points</p>
                  <p>{points}</p>
                </div>
                <div>
                  <p>Lignes</p>
                  <p>{linesCleared}</p>
                </div>
              </div>
              <div className="held-piece-container">
                <HeldPiece />
              </div>
              <Gameboard />
              <div className="piece-queue-container">
                <PieceQueue />
              </div>
              <div className="controls">
                <h3 className='font-bold text-gray-800 py-5'>Controls</h3>
                <div className="control-row">
                  <FontAwesomeIcon icon={faArrowUp} /> Rotate
                </div>
                <div className="control-row">
                  <FontAwesomeIcon icon={faArrowLeft} /> Left
                </div>
                <div className="control-row">
                  <FontAwesomeIcon icon={faArrowRight} /> Right
                </div>
                <div className="control-row">
                  <FontAwesomeIcon icon={faArrowDown} /> Soft Drop
                </div>
                <div className="control-row">
                 ▬ Drop
                </div>
              </div>
            </div>
          );
        }}
      </Tetris>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}   
        contentLabel="Game Over Modal"
      >
        <h2 className='text-2xl font-bold text-gray-800 px-5 py-5 text-red-500'>Game Over</h2>
        <button
          onClick={() => {
            if (gameController) {
              gameController.restart();
              closeModal();
            }
          }}
        >
          <h3 className='text-2xl font-bold text-gray-800 py-5 text-green-800'>Rejouer</h3>
        </button>
      </Modal>
    </div>
  );
};

export default TetrisComponent;
