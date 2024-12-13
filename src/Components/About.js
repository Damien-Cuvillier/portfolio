import React from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene'
import TestScene from './TestScene';
import '../resources/styles.css';
import { deg } from '../resources/helpers';

function About() {
  return (
    <div className="about p-80 my-10 w-full min-h-fit max-w-1280">
      <Canvas
        frameloop="demand"
        camera={{ fov: 75, position: [0, 0, 5], rotation: [0, deg(-20), deg(180)], near: 0.1, far: 20000 }}
        style={{ backgroundColor: 'lightgrey', border: '2px solid red', height:'500px'}}
      >
        {/* Ajout de lumières */}
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.5} position={[300, 300, 4000]} />

        {/* TestScene = modèle simplifé, Scene = modèle SVG */}
        <TestScene />
        {/* <Scene/> */}
      </Canvas>
      <span className="header">REACT THREE FIBER</span>
    </div>
  );
}

export default About;
