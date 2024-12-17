import * as THREE from 'three';
import flatten from 'lodash-es/flatten';
import { SVGLoader as loader } from 'three/examples/jsm/loaders/SVGLoader';
import './styles.css';

const doubleSide = THREE.DoubleSide;
const deg = THREE.MathUtils.degToRad;
const colors = ['#21242d', '#ea5158', '#0d4663', '#ffbcb7', '#2d4a3e', '#8bd8d2'];

const svgNames = ['night', 'city', 'morning', 'woods', 'beach'];
const svgs = svgNames.map(name => `/images/svg/${name}.svg`).map(
  url =>
    new Promise(resolve =>
      new loader().load(url, data => {
        const paths = data.paths;
        if (paths && paths.length > 0) {
          const flattenedShapes = flatten(paths.map((path, index) => {
            return path.toShapes(true).map(shape => ({
              shape,
              color: path.color || 'white',
              index
            }));
          }));
          resolve(flattenedShapes);
        } else {
          resolve([]);
        }
      })
    )
);

export { svgs, colors, deg, doubleSide, svgNames };
