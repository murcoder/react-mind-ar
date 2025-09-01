import React, {useState} from "react";
import NavBar from "@/html/NavBar.jsx";
import {ARView, ARAnchor} from "react-three-mind";

export default function App () {

  return (
    <>
      <NavBar/>
      {/* AR container */}
      <ARView
        imageTargets="/targets/card.mind"
        filterMinCF={0.1}
        filterBeta={1000}
        missTolerance={5}
        warmupTolerance={5}
        flipUserCamera={true}
      >
        <ambientLight/>
        <pointLight position={[10, 10, 10]}/>
        <ARAnchor
          target={0}
          onAnchorFound={() => console.log("Target found! 🎉")}
          onAnchorLost={() => console.log("Target lost! 😢")}
        >
          {/*<Experience />*/}
          <mesh position={[0, 0, 0]}>
            <planeGeometry/>
            <meshNormalMaterial/>
          </mesh>
        </ARAnchor>
      </ARView>
    </>
  );
}
