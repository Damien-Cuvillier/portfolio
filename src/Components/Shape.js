import React from 'react';
import { a } from '@react-spring/three';
import { doubleSide } from '../resources/helpers';

function Shape({ shape, rotation, position, color, opacity, index }) {
  return (
    <a.mesh
      rotation={rotation}
      position={position.interpolate((x, y, z) => [x, y, z + -index * 50])} // S'assurer que les objets ne se chevauchent pas
      scale={[2, 2, 2]} // Ajuster l'échelle pour rendre l'objet plus visible
    >
      <a.meshPhongMaterial attach="material" color={color} opacity={opacity} side={doubleSide} depthWrite={false} transparent />
      <shapeBufferGeometry attach="geometry" args={[shape]} />
      <meshBasicMaterial attach="material" color="white" />
    </a.mesh>
  );
}

export default Shape;
