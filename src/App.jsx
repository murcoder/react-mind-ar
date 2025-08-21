import React, {useState} from 'react';
import NavBar from "@/html/NavBar.jsx";
import {Button} from "@/components/ui/button.tsx";
import MindARThreeViewer from "@/mindar-three-viewer.jsx";

function App () {
  const [started, setStarted] = useState(false);

  return (
    <>
      <NavBar/>

      {/* Top-centered button */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
        <Button variant={"outline"} className={"cursor-pointer font-bold"} onClick={() => setStarted(!started)}>
          {started ? "Stop" : "Enter AR"}
        </Button>
      </div>

      {/* AR container */}
      {started && (
        <MindARThreeViewer/>
      )}
    </>
  );
}

export default App;
