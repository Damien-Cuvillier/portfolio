import React, { useState, useEffect } from 'react';
import { MeshStandardMaterial } from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { svgs } from '../resources/helpers';  // Importer les chemins des SVGs

const Scene = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const loadSVGShapes = async () => {
      try {
        const loader = new SVGLoader();
        
        // On charge chaque SVG dans svgs et attendons que chaque fichier soit récupéré
        const shapesData = await Promise.all(
          svgs.map(async (url) => {
            const response = await fetch(url);
            const text = await response.text();
            
            // Vérifier que le texte récupéré est bien un SVG valide
            if (!text.startsWith('<svg')) {
              console.error(`Invalid SVG file at ${url}:`, text);
              return [];
            }

            // Si c'est un SVG valide, on le parse
            const data = loader.parse(text);
            console.log(`Parsed SVG for ${url}:`, data);
            
            return data.paths.map((path) =>
              path.toShapes(true).map((shape) => ({
                shape,
                color: path.color || 'white',
              }))
            );
          })
        );
        
        // Aplatir les données des formes et les mettre à jour dans le state
        const flattenedShapes = shapesData.flat().flat();
        console.log('Flattened Shapes:', flattenedShapes);
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
      {shapes.length > 0 &&
        shapes.map(({ shape, color }, index) => (
          <mesh
            key={index}
            position={[0, 0, 0]}
            scale={[0.1, 0.1, 0.1]}
          >
            <shapeBufferGeometry args={[shape]} />
            <MeshStandardMaterial color={color || 'white'} />
          </mesh>
        ))}
    </>
  );
};

export default Scene;
