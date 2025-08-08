import React, {useState} from 'react';
import MindARThreeViewer from '../mindar-three-viewer';
import {Button} from "@/components/ui/button"

export const MindAR = () => {
  const [started, setStarted] = useState(null);

  return (
    <div className="text-center">
      <h1>R3F App with <a href="https://github.com/hiukim/mind-ar-js" target="_blank">MindAR</a></h1>

      <div className="relative z-[1000]">
        {started === null && <Button onClick={() => {
          setStarted('three')
        }}>Enter AR</Button>}
        {started !== null && <Button onClick={() => {
          setStarted(null)
        }}>Stop</Button>}
      </div>

      {started === 'three' && (
        <div className="relative my-5 mx-auto h-[300px] w-[600px] overflow-hidden">
          <MindARThreeViewer/>
        </div>
      )}
    </div>
  );
};
