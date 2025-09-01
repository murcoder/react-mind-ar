import {Html, useGLTF, Image} from "@react-three/drei";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import React, {useMemo, useRef, useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";
import {Badge} from "@/components/ui/badge";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import VideoPlayer from "@/components/VideoPlayer";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

export const Experience = () => {
  const [currentModel, setCurrentModel] = useState(0);
  const [currentImg, setCurrentImg] = useState(0);
  const [open, setOpen] = useState(false);
  const [api, setApi] = useState(null);

  // Load windmill models
  const windmill1 = useGLTF("/models/windmill_1.glb");
  const windmill2 = useGLTF("/models/windmill_2.glb");
  const windmill3 = useGLTF("/models/windmill_3.glb");
  const windmill4 = useGLTF("/models/windmill_4.glb");

  const rawModels = [windmill1.scene, windmill2.scene, windmill3.scene, windmill4.scene];

  // Normalize: same size + centered around origin
  const normalizedModels = useMemo(() => {
    const targetSize = 1.8; // tweak global “visual size” for all models
    return rawModels.map((scene) => {
      const clone = scene.clone(true);

      // compute bounds
      const box = new THREE.Box3().setFromObject(clone);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      // center model at origin so it sits consistently
      clone.position.sub(center);

      // uniform scale to targetSize
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const s = targetSize / maxDim;
      clone.scale.setScalar(s);

      return clone;
    });
  }, [rawModels]);

  // Match number of thumbnails to models (safe if counts differ)
  const thumbs = [
    "/img/wind/wind_1.jpg",
    "/img/wind/wind_2.jpg",
    "/img/wind/wind_3.jpg"
  ];
  const count = Math.min(normalizedModels.length, thumbs.length);
  const models = normalizedModels.slice(0, count);
  const images = thumbs.slice(0, count);
  const modelRef = useRef(null);

  useFrame(() => {
    // Slowly windmill rotation
    if (modelRef.current) modelRef.current.rotation.y += 0.005;
  });

  useEffect(() => {
    if (!api) return;
    const update = () => setCurrentImg(api.selectedScrollSnap());
    update();
    api.on("select", update);
    return () => api?.off?.("select", update);
  }, [api]);

  return (
    <>
      <VideoPlayer
        videoId="SjOMHtewpvc"
        thumb="/img/wind/wind_maus.jpg"
        position={[-1.5, 1, 0]}
        scale={[2, 1.2, 1]}
      />

      <Image
        url="/img/wind/windmill_history.jpg"
        opacity={1}
        position={[-1.5, -1, 0]}
        scale={[2, 1.2, 1]}
      />

      {/* Windmill Model (driven by carousel index) */}
      <primitive
        ref={modelRef}
        object={models[currentModel]}
        position={[-0.5, -1, 2]}
        rotation={[0, 0, 0]}
      />

      {/* Annotation Card */}
      <Html position={[1, 1, 0]} distanceFactor={1} transform occlude={[modelRef]} zIndexRange={[100, 0]}
            className="select-none touch-pan-x">
        <Card className="p-4 bg-white/90 rounded-2xl shadow-lg w-100 select-none">
          <CardHeader>
            <CardTitle>Windenergie</CardTitle>
            <CardDescription>
              <div className="flex flex-col items-center gap-2">
                <div className="flex w-full flex-wrap gap-2">
                  <Badge>Erneuerbar</Badge>
                  <Badge>CO₂-frei</Badge>
                  <Badge>Nachhaltig</Badge>
                </div>
              </div>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-sm mb-3">
              Windenergie nutzt die Bewegungsenergie der Luftströme, um
              elektrische Energie zu erzeugen. Moderne Windkraftanlagen wandeln
              den Wind über große Rotorblätter in Drehbewegung um, die einen
              Generator antreibt. Sie sind eine der wichtigsten erneuerbaren
              Energiequellen in Deutschland und tragen erheblich zur Reduktion
              von Treibhausgasemissionen bei.
            </p>

            {/* Image slideshow */}
            <Carousel className="w-full max-w-xs select-none touch-pan-y">
              <CarouselContent>
                {images.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="overflow-hidden">
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                          <img
                            src={src}
                            alt={`Windenergie Bild ${index + 1}`}
                            className="w-full h-full object-cover rounded-2xl pointer-events-auto"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious/>
              <CarouselNext/>
            </Carousel>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setOpen(true)}
              onTouchStart={() => setOpen(true)}
            >
              Mehr erfahren
            </Button>
          </CardFooter>
        </Card>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-3xl h-[80vh] w-[90vw]">
            <iframe
              src="https://de.wikipedia.org/wiki/Windenergie"
              className="w-full h-full rounded-lg"
            />
          </DialogContent>
        </Dialog>
      </Html>
    </>
  );
};

// Preload models
useGLTF.preload("/models/windmill_1.glb");
useGLTF.preload("/models/windmill_2.glb");
useGLTF.preload("/models/windmill_3.glb");
useGLTF.preload("/models/windmill_4.glb");
