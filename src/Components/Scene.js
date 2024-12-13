import React, { useState, useEffect } from 'react';
import { colors, svgs } from '../resources/helpers';
import { MeshStandardMaterial, mesh } from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

const Scene = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    // Charger et convertir les SVG en formes
    Promise.all(svgs.map(url => fetch(url).then(res => res.text())))
      .then(texts => {
        const loader = new SVGLoader();
        const shapeData = texts.map((text, index) => {
          console.log(`SVG Content for ${svgs[index]}:`, text);
          const parsed = loader.parse(text);
          console.log(`Parsed SVG for ${svgs[index]}:`, parsed);
          return parsed.paths;
        });
        console.log('Shape Data:', shapeData);
        const flattenedShapes = shapeData.flat().map(path =>
          path.toShapes(true).map(shape => ({
            shape,
            color: path.color || 'white', // Définir la couleur par défaut si non définie
          }))
        );
        console.log('Flattened Shapes:', flattenedShapes);
        setShapes(flattenedShapes);
      })
      .catch(error => console.error('Error loading SVGs:', error));
  }, []);

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight intensity={1} position={[10, 10, 5]} />
      {shapes.length > 0 &&
        shapes.map((shapeData, index) => (
          <group key={index}>
            {shapeData.map(({ shape, color }, shapeIndex) => (
              <mesh
                key={shapeIndex}
                position={[0, 0, 0]} // Assurez-vous que l'objet est dans le champ de vision de la caméra
                scale={[0.1, 0.1, 0.1]} // Réduire l'échelle pour le rendre visible
              >
                <shapeBufferGeometry args={[shape]} />
                <MeshStandardMaterial color={color || 'white'} />
              </mesh>
            ))}
          </group>
        ))}
    </>
  );
};

export default Scene;
