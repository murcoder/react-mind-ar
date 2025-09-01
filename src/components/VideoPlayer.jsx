import React, {useState} from "react";
import {Html, Image} from "@react-three/drei";

export default function VideoPlayer ({
                                       videoId,
                                       thumb,
                                       position = [0, 0, 0],
                                       scale = [2, 1.2, 1],
                                       autoPlay = true,
                                       width = 800,
                                       height = 450,
                                     }) {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      {!playing ? (
        <Image
          url={thumb}
          position={position}
          scale={scale}
          opacity={1}
          onClick={() => setPlaying(true)}
        />
      ) : (
        <Html position={position} transform distanceFactor={1.5} occlude>
          <div
            className="relative rounded-xl overflow-hidden shadow-lg"
            style={{width: `${width}px`, height: `${height}px`}}
          >
            <iframe
              width={width}
              height={height}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
            <button
              onClick={() => setPlaying(false)}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full px-2 py-1 text-xs"
            >
              ✕
            </button>
          </div>
        </Html>
      )}
    </>
  );
}
