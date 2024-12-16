import React, { useState, useEffect } from 'react';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { MeshBasicMaterial } from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { svgs } from '../resources/helpers';

const Scene = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const loadSVGShapes = async () => {
      try {
        const loader = new SVGLoader();

        const shapesData = await Promise.all(
          svgs.map(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
              console.error(`Failed to fetch ${url}`);
              return [];
            }
            const text = await response.text();
            const data = loader.parse(text);
            return data.paths.map((path) => 
              path.toShapes(true).map((shape) => ({
                shape,
                color: path.color || '#FFFFFF',  // Default to white if no color
              }))
            );
          })
        );

        const flattenedShapes = shapesData.flat().flat();
        setShapes(flattenedShapes);
      } catch (error) {
        console.error('Error loading SVGs:', error);
      }
    };

    loadSVGShapes();
  }, []);

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight intensity={1} position={[10, 10, 5]} />
      {shapes.map(({ shape, color }, index) => (
        <mesh key={index} scale={[0.1, 0.1, 0.1]}>
          <shapeBufferGeometry args={[shape]} />
          <MeshBasicMaterial color={color} />
        </mesh>
      ))}
    </>
  );
};

export default Scene;
