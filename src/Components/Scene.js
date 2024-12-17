// import React, { useState, useEffect } from 'react';
// import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
// import { MeshBasicMaterial } from 'three';
// import { svgs } from '../resources/helpers';

// const Scene = () => {
//   const [shapes, setShapes] = useState([]);

//   useEffect(() => {
//     const loadSVGShapes = async () => {
//       try {
//         const loader = new SVGLoader();
    
//         const shapesData = await Promise.all(
//           svgs.map(async (url) => {
//             console.log(`Fetch SVG from URL: ${url}`);
//             const response = await fetch(url);
//             console.log(`Response for ${url}:`, response);
//             if (!response.ok) {
//               console.error(`Failed to fetch ${url}`);
//             return [];
//             }
//             const text = await response.text();
            
//             // Vérification du contenu SVG avant de le parser
//             if (!text || !text.includes('<svg')) {
//               console.error(`Invalid SVG content from ${url}: ${text}`);
//               return [];
//             }
            
//             const data = loader.parse(text);
//             console.log(`Parsed SVG data for ${url}:`, data);
    
//             return data.paths.map((path) =>
//               path.toShapes(true).map((shape) => ({
//                 shape,
//                 color: path.color || '#FFFFFF',  
//               }))
//             );
//           })
//         );
    
//         const flattenedShapes = shapesData.flat().flat();
//         console.log('Flattened shapes:', flattenedShapes);
//         setShapes(flattenedShapes);
//       } catch (error) {
//         console.error('Error loading SVGs:', error);
//       }
//     };
    
    

//     loadSVGShapes();
//   }, []);

//   console.log('Loaded shapes:', shapes); 

//   return (
//     <>
//       <ambientLight intensity={0.8} />
//       <directionalLight intensity={1} position={[10, 10, 5]} />
//       {shapes.map(({ shape, color }, index) => (
//         <mesh key={index} position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]}>
//           <shapeBufferGeometry args={[shape]} />
//           <MeshBasicMaterial color={color} />
//         </mesh>
//       ))}
//     </>
//   );
// };

// export default Scene;
