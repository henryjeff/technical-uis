"use client";

import styles from "./scene.module.css";
import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "../store";
import { PointerLockControls, Stats } from "@react-three/drei";

const TRACKING_RADIUS = 200;

function Cube({ position }: { position: [number, number, number] }) {
  const cubeRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    cubeRef.current.rotation.x = t;
    cubeRef.current.rotation.y = t;
    cubeRef.current.position.x = position[0] + Math.sin(t) * 8;
    cubeRef.current.position.y = position[1] + Math.cos(t) * 5;
  });

  return (
    <mesh ref={cubeRef} position={position}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#292680" />
    </mesh>
  );
}

export function SceneObjects() {
  const { camera, scene } = useThree();

  const store = useStore();

  useFrame(() => {
    if (!camera) return;
    // Calculate the projection matrix
    camera.updateProjectionMatrix();

    // Create a frustum from the camera's projection matrix
    const frustum = new THREE.Frustum();
    frustum.setFromProjectionMatrix(
      new THREE.Matrix4().multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
      )
    );

    for (let i = 0; i < scene.children.length; i++) {
      const pos = new THREE.Vector3().setFromMatrixPosition(
        scene.children[i].matrixWorld
      );
      const posCopy = new THREE.Vector3().copy(pos);
      if (scene.children[i].type !== "Mesh") continue;

      const id = `${scene.children[i].id}`;

      const inStore = Object.keys(store.targets).includes(id);

      // If the mesh is in the view
      if (frustum.containsPoint(pos)) {
        const screenPos = pos.project(camera);
        const pixelPos = {
          x:
            ((screenPos.x + 1) * window.innerWidth) / 2 - window.innerWidth / 2,
          y:
            ((-screenPos.y + 1) * window.innerHeight) / 2 -
            window.innerHeight / 2,
        };

        // get the distance x, y to 0,0
        const pixelDistanceToCenter = Math.sqrt(
          Math.pow(pixelPos.x, 2) + Math.pow(pixelPos.y, 2)
        );

        if (pixelDistanceToCenter > TRACKING_RADIUS) {
          if (inStore) {
            store.removeTarget(id);
          }
          continue;
        }

        // get distance from camera position to the object
        const distance = camera.position.distanceTo(posCopy);

        // calculate a circle with a radius of 200 at the center of the screen which is 0,0
        // then calculate to see if the updated pixel positions are within the circle

        store.updateTarget(id, {
          x: pixelPos.x,
          y: pixelPos.y,
          z: distance,
        });
      } else {
        if (inStore) {
          store.removeTarget(id);
        }
      }
    }
  });

  return (
    <>
      <PointerLockControls pointerSpeed={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 20, 0]} intensity={2} />
      <Cube position={[0, 0, 10]} />
      <Cube position={[0, 0, -50]} />
      <Cube position={[5, 0, 0]} />
      <Cube position={[-20, 0, 0]} />
      {/* <mesh position={[0, -5, 5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry args={[100, 100]} />
        <meshStandardMaterial color="black" />
      </mesh> */}
    </>
  );
}

export function Scene() {
  return (
    <div className={styles.canvas}>
      <Canvas>
        <Stats />
        <SceneObjects />
      </Canvas>
    </div>
  );
}
