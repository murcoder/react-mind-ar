// mindar-three-viewer.jsx
import React, {useEffect, useState} from "react";
import {Canvas, useThree} from "@react-three/fiber";
import {MindARThree} from "mind-ar/dist/mindar-image-three.prod.js";

function AnchorContent ({anchor}) {
  return (
    <primitive object={anchor.group}>
      <mesh>
        <planeGeometry args={[1, 0.55]}/>
        <meshBasicMaterial color="cyan" transparent opacity={0.5}/>
      </mesh>
    </primitive>
  );
}

function ARScene () {
  const {gl, scene, camera} = useThree();
  const [anchor, setAnchor] = useState(null);

  useEffect(() => {
    const mindarThree = new MindARThree({
      container: gl.domElement.parentElement,
      imageTargetSrc: "./card.mind",
      renderer: gl,
      scene,
      camera,
    });

    const anchor = mindarThree.addAnchor(0);
    setAnchor(anchor);

    anchor.onTargetFound = () => console.log("Target found! 🎉");
    anchor.onTargetLost = () => console.log("Target lost! 😢");

    mindarThree.start();

    gl.setAnimationLoop(() => {
      gl.render(scene, camera);
    });

    return () => {
      // TODO - mesh is not visible or not be drawn
      mindarThree.stop();
      gl.setAnimationLoop(null);
    };
  }, [gl, scene, camera]);

  return (
    <>
      <ambientLight/>
      <pointLight position={[5, 5, 5]}/>
      {anchor && <AnchorContent anchor={anchor}/>}
    </>
  );
}

export default function MindARThreeViewer () {
  return (
      <Canvas
        style={{ position: "absolute", minWidth: "100vw", minHeight: "100vh" }}>
        <ARScene/>
      </Canvas>
  );
}
