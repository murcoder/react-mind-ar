import React, {useEffect, useRef, useState} from "react";
import {Canvas, useThree} from "@react-three/fiber";
import * as THREE from "three";
import {MindARThree} from "mind-ar/dist/mindar-image-three.prod.js";

function ARPlane ({anchor}) {
  const meshRef = useRef();

  useEffect(() => {
    if (!anchor) return;

    // Hide plane initially
    meshRef.current.visible = false;

    // Show/hide when target is found/lost
    anchor.onTargetFound = () => {
      console.log("Target found! 🎉")
      meshRef.current.visible = true;
    }
    anchor.onTargetLost = () => {
      console.log("Target lost! 😢")
      meshRef.current.visible = false;
    }
  }, [anchor]);

  return (
    <group ref={meshRef}>
      <mesh>
        <planeGeometry args={[1, 0.55]}/>
        <meshBasicMaterial
          color={0x00ffff}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function ARScene () {
  const {scene, camera, gl} = useThree();
  const [anchor, setAnchor] = useState(null);

  useEffect(() => {
    const mindarThree = new MindARThree({
      container: document.body,
      imageTargetSrc: "./card.mind",
      renderer: gl,
      scene: scene,
      camera: camera,
    });

    const newAnchor = mindarThree.addAnchor(0);
    setAnchor(newAnchor);

    mindarThree.start();

    return () => {
      mindarThree.stop();
    };
  }, [scene, camera, gl]);

  // TODO - Plane is in the middle of the screen, not on the target
  return anchor ? <ARPlane anchor={anchor}/> : null;
}

export default function MindARThreeViewer () {
  return (
    <Canvas style={{ position: "absolute", minWidth: "100vw", minHeight: "100vh" }}>>
      <ambientLight/>
      <ARScene/>
    </Canvas>
  );
}
