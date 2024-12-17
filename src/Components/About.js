import * as THREE from 'three';
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTransition, a } from '@react-spring/three';
import flatten from 'lodash-es/flatten';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import '../resources/styles.css';
import { ShapeGeometry } from 'three';
import { extend } from '@react-three/fiber';

// Liste des fichiers SVG
const svgNames = ['night', 'city', 'morning', 'woods', 'beach'];
const svgUrls = svgNames.map(name => `/images/svg/${name}.svg`);

extend({ ShapeGeometry });

function Shape({ shape, position, color, opacity, index }) {
  return (
    <a.mesh position={position.to((x, y, z) => [x, y, z + -index * 100, 0, 0])}>
      <a.meshPhongMaterial attach="material" color={color} opacity={opacity} side={THREE.DoubleSide} depthWrite={false} transparent />
      <primitive attach="geometry" object={new ShapeGeometry(shape)} />
    </a.mesh>
  );
}

function Scene() {
  const [shapes, setShapes] = useState([]);
  const [currentSVG, setCurrentSVG] = useState(0);

  // Charge les SVGs à la demande
  const loadSVG = (svgUrl) => {
    return new Promise((resolve, reject) => {
      console.log(`Loading SVG from ${svgUrl}`);
      new SVGLoader().load(
        svgUrl,
        data => {
          if (data && data.paths) {
            console.log('SVG loaded successfully:', data);
            resolve(flatten(data.paths.map((path, index) =>
              path.toShapes(true).map(shape => ({ shape, color: path.color, index })))
            ));
          } else {
            console.error('Failed to load SVG: No paths found');
            reject(new Error('Failed to load SVG: No paths found'));
          }
        },
        undefined,
        error => {
          console.error('Error loading SVG:', error);
          reject(new Error('Failed to load SVG'));
        }
      );
    });
  };

  useEffect(() => {
    const svgUrl = svgUrls[currentSVG];
    loadSVG(svgUrl)
      .then(setShapes)
      .catch(error => console.error('Error loading SVG:', error));
  }, [currentSVG]);

  useEffect(() => {
    let timeoutId;
  
    const loadNextSVG = () => {
      setCurrentSVG(prev => (prev + 1) % svgUrls.length); // Change SVG à la fin de chaque transition
      timeoutId = setTimeout(loadNextSVG, 10000); // Change toutes les 10 secondes
    };
  
    loadNextSVG(); // Démarre la première transition
  
    return () => clearTimeout(timeoutId);
  }, []); // Dépendance vide pour que cela ne se déclenche qu'une fois au démarrage
  

  const transitions = useTransition(shapes, {
    from: { position: [0, 50, -200], opacity: 0 },
    enter: { position: [0, 0, 0], opacity: 1 },
    leave: { position: [0, -50, 10], opacity: 0 },
    keys: item => item.shape.uuid,
    trail: 2, // Réduit l'écart entre les éléments animés pour améliorer la performance
    config: { mass: 1, tension: 180, friction: 12 }, // Ajuste la vitesse des animations
    lazy: true,
  });

  return (
    <group position={[1600, -700, 0]} rotation={[0, THREE.MathUtils.degToRad(180), 0]}>
      {transitions((props, item) => (
        <Shape key={item.shape.uuid} {...item} {...props} />
      ))}
    </group>
  );
}

function About() {
  return (
    <div className="main about p-60 my-10 w-full max-w-1280">
      <Canvas
        camera={{
          fov: 80,
          position: [0, 0, 2000],
          rotation: [0, THREE.MathUtils.degToRad(-20), THREE.MathUtils.degToRad(180)],
          far: 20000,
        }}
        style={{ border: '2px solid red', height:'500px', width:'100%' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.5} position={[300, 300, 4000]} />
        <Scene />
      </Canvas>
    </div>
  );
}

export default About;
