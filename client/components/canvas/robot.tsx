import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import CanvasLoader from "./loader";
import { Group } from "three";
import { Mesh, MeshStandardMaterial } from "three";

const Computers = ({ isMobile }) => {
  const modelRef = useRef<Group>(null);
  const { scene, animations } = useGLTF("../../../robot/source/robot.gltf");
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    if (!actions) return;

    const names = Object.keys(actions);
    let index = 0;
    let currentAction = null;

    const playNextAnimation = () => {
      if (currentAction) {
        currentAction.fadeOut(0.5);
      }

      const nextAction = actions[names[index]];
      if (nextAction) {
        nextAction.reset().fadeIn(0.5).play();

        currentAction = nextAction;
      }

      index = (index + 1) % names.length;
    };

    playNextAnimation();
    const interval = setInterval(playNextAnimation, 5000);

    return () => clearInterval(interval);
  }, [actions]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y -= 0.001;
    }
  });

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;

        if (mesh.material && "color" in mesh.material) {
          const material = mesh.material as MeshStandardMaterial;
          material.color.set("#f85712");

          if ("metalness" in material) material.metalness = 0.1;
          if ("roughness" in material) material.roughness = 0.1;
        }
      }
    });
  }, [scene]);

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        ref={modelRef}
        object={scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[0, Math.PI * 1.3, 0]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <ambientLight intensity={20} />
      <directionalLight position={[10, 10, 5]} intensity={20} />

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
