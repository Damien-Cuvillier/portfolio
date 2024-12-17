import React from 'react';
import { Canvas } from '@react-three/fiber';
import TestScene from './TestScene';
import '../resources/styles.css';
import { deg } from '../resources/helpers';

function About() {
  return (
    <div id='about' className="about p-52 h-full my-10 w-full max-w-1280">
      <Canvas
        frameloop="demand"
        camera={{ fov: 75, position: [0, 0, 500], near: 0.1, far: 1000 }} 
        style={{ backgroundColor: 'lightgrey', border: '2px solid red', height: '800px', width: '1200px'}}
      >
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.5} position={[300, 300, 4000]} />
        <TestScene />
      </Canvas>
      <span className="header-about">Damien Cuvillier</span>
    </div>
  );
}

export default About;
