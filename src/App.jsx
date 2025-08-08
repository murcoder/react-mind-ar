import React, {useState} from 'react';
import MindARThreeViewer from './mindar-three-viewer';
import {Button} from "@/components/ui/button"
import {Experience} from "@/components/Experience.jsx";
import NavBar from "@/html/NavBar.jsx";
import {Canvas} from "@react-three/fiber";
import {MindAR} from "@/components/MindAR.jsx";

function App () {
  const [started, setStarted] = useState(null);

  return (
    <>
      <NavBar />
      <MindAR></MindAR>
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
          <color attach="background" args={['#ececec']} />
          <Experience />
      </Canvas>
    </>
  );
}

export default App;
