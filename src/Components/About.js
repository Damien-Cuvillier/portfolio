import React from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import '../resources/styles.css';
import { deg } from '../resources/helpers';

function About() {
  return (
    <div className="about p-60 my-10 w-full max-w-1280">
      <Canvas
        frameloop="demand"
        camera={{ fov: 75, position: [0, 0, 5], rotation: [0, deg(-20), deg(180)], near: 0.1, far: 20000 }}
        style={{ border: '2px solid red', height: '500px', width: '100%', marginLeft: '100px' }}
      >
        <Scene />
      </Canvas>
      <span className="header">REACT THREE FIBER</span>
    </div>
  );
}

export default About;
