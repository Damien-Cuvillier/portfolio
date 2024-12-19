import * as THREE from 'three';
import React, { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTransition, a } from '@react-spring/three';
import flatten from 'lodash-es/flatten';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import '../resources/styles.css';
import { ShapeGeometry } from 'three';
import { extend } from '@react-three/fiber';
import { useSpring } from 'react-spring';

const svgNames = ['city', 'woods', 'beach','morning'];
const svgUrls = svgNames.map(name => `/images/svg/${name}.svg`);

const svgDimensions = { 
  city: [5, 5, 5], 
  morning: [2, 2, 2], 
  woods: [1, 1, 1], 
  beach: [5, 5, 5], 
};

extend({ ShapeGeometry });

function Shape({ shape, position, color, opacity, index, scale }) {
  const transformPosition = index === 0 ? [position[0] + 100, position[1] + 100, position[2]] : position;
  return (
    <a.mesh position={transformPosition} scale={scale}>
      <a.meshPhongMaterial attach="material" color={color} opacity={opacity} side={THREE.DoubleSide} depthWrite={false} transparent />
      <primitive attach="geometry" object={new ShapeGeometry(shape)} />
    </a.mesh>
  );
}

const svgCache = {};

const loadSVG = (svgUrl) => {
  if (svgCache[svgUrl]) {
    return Promise.resolve(svgCache[svgUrl]);
  }

  return new Promise((resolve, reject) => {
    new SVGLoader().load(
      svgUrl,
      data => {
        if (data && data.paths) {
          const shapes = flatten(data.paths.map((path, index) =>
            path.toShapes(true).map(shape => ({ shape, color: path.color, index }))
          ));
          svgCache[svgUrl] = shapes;
          resolve(shapes);
        } else {
          reject(new Error('Failed to load SVG: No paths found'));
        }
      },
      undefined,
      error => {
        reject(new Error('Failed to load SVG'));
      }
    );
  });
};

let lastFrameTime = performance.now();
function Scene() {
  const [shapes, setShapes] = useState([]);
  const [currentSVG, setCurrentSVG] = useState(0);
  const colors = ['#535763', '#e0757a', '#2d4a3e', '#8bd8d2'];

  const handleSVGChange = useCallback(async () => {
    const svgUrl = svgUrls[currentSVG];
    try {
      const newShapes = await loadSVG(svgUrl);
      setShapes(newShapes);
    } catch (error) {
      console.error('Error loading SVG:', error);
    }
  }, [currentSVG]);

  useEffect(() => {
    handleSVGChange();
  }, [currentSVG, handleSVGChange]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSVG(prev => (prev + 1) % svgUrls.length);
    }, 10000); // Change toutes les 10 secondes

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    function render() {
      const currentTime = performance.now();
      if (currentTime - lastFrameTime >= 16) { // 60 FPS
        // Effectuer le rendu ici
        lastFrameTime = currentTime;
      }
      requestAnimationFrame(render);
    }
    render();
  }, []);

  const { color } = useSpring({ color: colors[currentSVG] });

  const transitions = useTransition(shapes, {
    from: ({ shape }) => ({
      position: [500, 500, 200],
      opacity: 0,
      scale: svgDimensions[svgNames[currentSVG]] || [2, 2, 2]
    }),
    enter: ({ shape }) => ({
      position: [-100, 0, 0],
      opacity: 1,
      scale: svgDimensions[svgNames[currentSVG]] || [2, 2, 2]
    }),
    leave: ({ shape }) => ({
      position: [0, -50, 10],
      opacity: 0,
      scale: svgDimensions[svgNames[currentSVG]] || [2, 2, 2]
    }),
    keys: item => item.shape.uuid,
    trail: 0.5,
    config: { mass: 10, tension: 400, friction: 50, precision: 0.0001 },
    lazy: true,
  });

  return (
    <>
      <a.mesh scale={[20000, 20000, 1]} rotation={[0, THREE.MathUtils.degToRad(-20), 0]}>
        <planeGeometry attach="geometry" args={[1, 1]} />
        <a.meshPhongMaterial attach="material" color={color} depthTest={false} />
      </a.mesh>

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
        <spotLight intensity={0.5} position={[300, 300, 400]} />
        <Scene />
      </Canvas>
      <span className="header-about">Damien Cuvillier</span>
    </div>
  );
}

export default About;
