import React from 'react';

function TestScene() {
  return (
    <>
      {/* Ajout d'un cube */}
      <mesh position={[-2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} /> {/* Forme géométrique */}
        <meshStandardMaterial color="orange" /> {/* Matériau */}
      </mesh>
      
      {/* Ajout d'une sphère */}
      <mesh position={[2, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} /> {/* Forme géométrique */}
        <meshStandardMaterial color="royalblue" /> {/* Matériau */}
      </mesh>
    </>
  );
}

export default TestScene;
