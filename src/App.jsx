import React, {useState} from 'react';
import NavBar from "@/html/NavBar.jsx";
import {ARView, ARAnchor} from "@/react-three-mind/AR.jsx";
import {Button} from "@/components/ui/button.tsx";

function Plane (props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[0.5, 0.5, 0.05]}/>
      <meshStandardMaterial color="orange"/>
    </mesh>
  );
}

function App () {
  const [started, setStarted] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <NavBar/>

      {/* Top-centered button */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
        <Button variant={"outline"} className={"cursor-pointer font-bold"} onClick={() => setStarted(!started)}>
          {started ? "Stop" : "Enter AR"}
        </Button>
      </div>

      {/* AR container */}
      {started && (
          <ARView
            imageTargets="./card.mind"
            filterMinCF={0.1}
            filterBeta={1000}
            missTolerance={50}
            warmupTolerance={50}
            flipUserCamera={false}
          >
            <ambientLight/>
            <pointLight position={[10, 10, 10]}/>

            <ARAnchor target={0}
                      onAnchorFound={() => console.log("Anchor found! 🎉")}
                      onAnchorLost={() => console.log("Anchor lost! 😢")}>
              <Plane position={[-0.5, 0.5, 0]}/>
            </ARAnchor>
          </ARView>
      )}
    </div>
  );
}

export default App;
