import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import html2canvas from 'html2canvas';

const vertexShader = `
uniform vec2 uMouse;
varying vec2 vUv;

float circle(vec2 uv, vec2 circlePosition, float radius) {
  float dist = distance(circlePosition, uv);
  return 1. - smoothstep(0.0, radius, dist);
}

void main() {
  vUv = uv;
  vec3 newPosition = position;

  vec2 mousePositions = uMouse * 0.5 + 0.5;
  float circleShape = circle(uv, mousePositions, 0.2);
  float intensity = 0.7;
  newPosition.z += circleShape * intensity;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
  vec4 finalTexture = texture2D(uTexture, vUv);
  gl_FragColor = vec4(finalTexture);
}
`;

const useDomToCanvas = (domEl) => {
  const [texture, setTexture] = useState();

  useEffect(() => {
    if (!domEl) return;
    const convertDomToCanvas = async () => {
      const canvas = await html2canvas(domEl, {
        backgroundColor: null,
        scale: 3, // Augmente la résolution de la texture
      });
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      setTexture(texture);
    };
    convertDomToCanvas();

    const debouncedResize = () => {
      convertDomToCanvas();
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [domEl]);

  return texture;
};

const Scene = () => {
  const { viewport } = useThree();
  const materialRef = useRef();
  const domRef = useRef();
  const texture = useDomToCanvas(domRef.current);

  const uniforms = useRef({
    uMouse: { value: new THREE.Vector2() },
    uTexture: { value: texture },
  }).current;

  useFrame((state) => {
    const { mouse } = state;
    uniforms.uMouse.value.set(mouse.x, mouse.y);
  });

  useEffect(() => {
    if (materialRef.current && texture) {
      uniforms.uTexture.value = texture;
      materialRef.current.needsUpdate = true;
    }
  }, [texture]);

  return (
    <>
      <Html zIndexRange={[-1, -10]} prepend fullscreen>
        <div ref={domRef} className="dom-element text-center text-white font-sans p-2 w-full overflow-hidden">
          <div className="text-gray-800 text-5xl font-bold tracking-tight leading-none">Damien Cuvillier</div>
          <div className="text-gray-800 text-3xl mt-2 tracking-tight leading-tight">Développeur web</div>
          <div className="text-gray-800 text-xs mt-2 tracking-tight leading-relaxed text-center">
            Passionné par le développement front-end, je place l'expérience utilisateur et l'accessibilité au cœur de mes projets. 
            <br/>Mon objectif est de créer des interfaces centrées sur l'Humain, qui soient à la fois esthétiques et fonctionnelles.
            <br/>J'ai travaillé sur plusieurs projets intéressants que je serais ravi de partager avec vous. Si vous souhaitez en savoir plus, je vous invite à découvrir mon portfolio.
          </div>
        </div>
      </Html>
      <mesh scale={[1.5, 1, 1]}>
        <planeGeometry args={[viewport.width, viewport.height * 0.5, 512, 512]} />
        <shaderMaterial ref={materialRef} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
      </mesh>
    </>
  );
};

const BulgeTextEffect = () => {
  return (
    <Canvas>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 5]} />
      <Scene />
    </Canvas>
  );
};

export default BulgeTextEffect;
