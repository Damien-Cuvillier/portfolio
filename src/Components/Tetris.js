import React, { useState, useEffect } from 'react';
import Tetris from 'react-tetris';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowRight, faArrowLeft, faArrowDown, faGamepad } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import '../App.css';

const TetrisComponent = () => {
  const [gameController, setGameController] = useState(null);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    if (gameState === 'LOST' && gameController) {
      Swal.fire({
        title: 'Game Over',
        text: 'Voulez-vous rejouer ?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Rejouer',
        cancelButtonText: 'Annuler',
        customClass: {
          title: 'text-2xl font-bold text-gray-800 text-red-500',
          confirmButton: 'text-2xl font-bold text-gray-800',
          cancelButton: 'text-2xl font-bold text-gray-800',
          popup: 'rounded-lg p-4'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          gameController.restart();
        }
      });
    }
  }, [gameState, gameController]);

  return (
    <div className="tetris-container bg-gray-100 py-1">
      <h2 className='text-2xl font-bold text-gray-800 px-5 py-5 pr-7'>
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
                <div>"C" hold</div>
                <div>"P" Pause</div>
              </div>
              <button
                onClick={() => gameController && gameController.restart()}
                className="restart-button text-gray-600 mt-5 bg-green-200 text-white py-2 px-4 rounded"
              >
                Rejouer
              </button>
            </div>
          );
        }}
      </Tetris>
    </div>
  );
};

export default TetrisComponent;
