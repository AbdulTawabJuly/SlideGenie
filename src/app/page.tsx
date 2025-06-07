// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

"use client"

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Galaxy() {
  const pointsRef = useRef<THREE.Points>(null);
  const galaxyCount = 5000;
  const positions = new Float32Array(galaxyCount * 3);
  const colors = new Float32Array(galaxyCount * 3);
  const sizes = new Float32Array(galaxyCount);

  for (let i = 0; i < galaxyCount; i++) {
    const radius = Math.random() * 20;
    const angle = Math.random() * Math.PI * 2 + radius * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = (Math.random() - 0.5) * 0.5;

    const armOffset = Math.sin(radius * 0.5) * 2;
    positions[i * 3] = x + armOffset * Math.cos(angle);
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z + armOffset * Math.sin(angle);

    const distance = Math.sqrt(x * x + z * z);
    const t = Math.min(distance / 20, 1);
    const r = 1.0 - t * 0.2;
    const g = 1.0 - t * 0.4;
    const b = 0.8 + t * 0.2;
    colors[i * 3] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;

    sizes[i] = 0.2 * (1 - t) + 0.05;
  }

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
    }
  });

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      pointSize: { value: 1.0 },
    },
    vertexShader: `
      attribute vec3 color;
      attribute float size;
      varying vec3 vColor;
      uniform float pointSize;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * pointSize * (300.0 / -max(mvPosition.z, 0.1));
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = smoothstep(0.5, 0.0, dist);
        gl_FragColor = vec4(vColor, alpha * 0.8);
      }
    `,
    transparent: true,
    vertexColors: true,
  });

  return (
    <Points ref={pointsRef} positions={positions} rotation={[Math.PI / 4, 0, 0]}>
      <bufferAttribute
        attach="geometry-attributes-color"
        args={[colors, 3]}
      />
      <bufferAttribute
        attach="geometry-attributes-size"
        args={[sizes, 1]}
      />
      <primitive object={shaderMaterial} attach="material" />
    </Points>
  );
}

function BackgroundStars() {
  const pointsRef = useRef<THREE.Points>(null);
  const starsCount = 500;
  const positions = new Float32Array(starsCount * 3);
  const opacities = new Float32Array(starsCount);

  for (let i = 0; i < starsCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    opacities[i] = 0.5 + Math.random() * 0.5;
  }

  useFrame(() => {
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.PointsMaterial;
      for (let i = 0; i < starsCount; i++) {
        opacities[i] = 0.5 + 0.5 * Math.sin(Date.now() * 0.001 + i);
      }
      material.opacity = 0.8;
      material.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.1}
        sizeAttenuation
        opacity={0.8}
      />
    </Points>
  );
}

function Rain() {
  const rainRef = useRef<THREE.InstancedMesh>(null);
  const rainCount = 1000;
  const dummy = new THREE.Object3D();
  const positions = new Float32Array(rainCount * 3);
  const velocities = new Float32Array(rainCount);
  const sizes = new Float32Array(rainCount);

  for (let i = 0; i < rainCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = Math.random() * 25;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    velocities[i] = -0.15 - Math.random() * 0.1;
    sizes[i] = 0.1 + Math.random() * 0.05;
  }

  useFrame(() => {
    if (rainRef.current) {
      for (let i = 0; i < rainCount; i++) {
        positions[i * 3 + 1] += velocities[i];
        if (positions[i * 3 + 1] < -25) {
          positions[i * 3 + 1] = 25;
          positions[i * 3] = (Math.random() - 0.5) * 50;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        dummy.position.set(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2]
        );
        dummy.scale.set(0.02, sizes[i], 0.02);
        dummy.updateMatrix();
        rainRef.current.setMatrixAt(i, dummy.matrix);
      }
      rainRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const rainMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color('#88ccff') },
      time: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float time;
      varying vec2 vUv;
      void main() {
        float alpha = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
        gl_FragColor = vec4(color, alpha * 0.7);
      }
    `,
    transparent: true,
  });

  return (
    <instancedMesh ref={rainRef} args={[null, null, rainCount]} material={rainMaterial}>
      <boxGeometry args={[1, 1, 1]} />
    </instancedMesh>
  );
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={['#1a1a2e', 20, 50]} />
      <Galaxy />
      <BackgroundStars />
      <Rain />
      <ambientLight intensity={0.3} color="#88aaff" />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#ffffff" />
    </>
  );
}

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[#1a1a2e]">
      <Canvas
        camera={{ position: [0, 10, 30], fov: 60 }}
        style={{ height: '100vh' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}