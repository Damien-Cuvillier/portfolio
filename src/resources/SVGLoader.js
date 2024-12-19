// import * as THREE from 'three';

// class SVGLoader extends THREE.Loader {
//   constructor(manager) {
//     super(manager);
//   }

//   load(url, onLoad, onProgress, onError) {
//     const loader = new THREE.FileLoader(this.manager);
//     loader.setPath(this.path);
//     loader.setRequestHeader(this.requestHeader);
//     loader.setWithCredentials(this.withCredentials);
//     loader.load(url, text => {
//       try {
//         onLoad(this.parse(text));
//       } catch (e) {
//         if (onError) {
//           onError(e);
//         } else {
//           console.error(e);
//         }
//         this.manager.itemError(url);
//       }
//     }, onProgress, onError);
//   }

//   parse(text) {
//     const paths = [];
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(text, 'image/svg+xml');
//     const svg = doc.querySelector('svg');

//     if (!svg) {
//       throw new Error('SVGLoader: SVG not found.');
//     }

//     const nodes = svg.querySelectorAll('path');
//     nodes.forEach(node => {
//       const pathData = node.getAttribute('d');
//       const color = node.getAttribute('fill') || '#000';
//       const shapes = THREE.ShapeUtils.createShapes(new THREE.ShapePath().fromSVGString(pathData));
//       shapes.forEach(shape => {
//         paths.push({ shape, color });
//       });
//     });

//     return { paths };
//   }
// }

// export { SVGLoader };
