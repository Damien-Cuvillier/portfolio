import * as THREE from 'three';
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTransition, a } from '@react-spring/three';
import flatten from 'lodash-es/flatten';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import '../resources/styles.css';
import { ShapeGeometry } from 'three';
import { extend } from '@react-three/fiber';
import { useSpring } from 'react-spring';

// Liste des fichiers SVG
const svgNames = ['city', 'morning', 'woods', 'beach'];
const svgUrls = svgNames.map(name => `/images/svg/${name}.svg`);

extend({ ShapeGeometry });

function Shape({ shape, position, color, opacity, index }) {
  const transformPosition = index === 0 ? [position[0] + 100, position[1] + 100, position[2]] : position;
  return (
    <a.mesh 
      position={transformPosition}  // Appliquer la position modifiée conditionnellement
      scale={[2, 2, 2]}  // Agrandir l'image SVG
    >
      <a.meshPhongMaterial attach="material" color={color} opacity={opacity} side={THREE.DoubleSide} depthWrite={false} transparent />
      <primitive attach="geometry" object={new ShapeGeometry(shape)} />
    </a.mesh>
  );
}

function Scene() {
  const [shapes, setShapes] = useState([]);
  const [currentSVG, setCurrentSVG] = useState(0);

  // Liste des couleurs pour le fond
  const colors = ['#535763', '#e0757a', '#2d4a3e', '#8bd8d2' ];
  
  // Charge les SVG à la demande
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

  // Animation de la couleur de fond
  const { color } = useSpring({ color: colors[currentSVG] });

  const transitions = useTransition(shapes, {
    from: { position: [0, 50, -200], opacity: 0 },
    enter: { position: [0, 0, 0], opacity: 1 },
    leave: { position: [0, -50, 10], opacity: 0 },
    keys: item => item.shape.uuid,
    trail: 2,
    config: { mass: 1, tension: 180, friction: 12 },
    lazy: true,
  });

  return (
    <>
      {/* Fond dynamique */}
      <a.mesh scale={[20000, 20000, 1]} rotation={[0, THREE.MathUtils.degToRad(-20), 0]}>
        <planeGeometry attach="geometry" args={[1, 1]} />
        <a.meshPhongMaterial attach="material" color={color} depthTest={false} />
      </a.mesh>

      {/* SVGs animés */}
      <group position={[1600, -700, 0]} rotation={[0, THREE.MathUtils.degToRad(180), 0]}>
        {transitions((props, item) => (
          <Shape key={item.shape.uuid} {...item} {...props} />
        ))}
      </group>
    </>
  );
}

function About() {
  return (
    <div className="about w-full h-full">
      <Canvas
        camera={{
          fov: 80,
          position: [0, 0, 2000],
          rotation: [0, THREE.MathUtils.degToRad(-20), THREE.MathUtils.degToRad(180)],
          far: 20000,
        }}
        style={{ display:'block', height:'955px', width:'100%', margin:'auto' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.5} position={[300, 300, 4000]} />
        <Scene />
      </Canvas>
      <span class="header-about">Damien Cuvillier</span>
    </div>
  );
}

export default About;
