"use client";

import { useRef } from "react";
import { useStore } from "../store";
import { LockingCrosshair } from "./locking-crosshair";
import styles from "./index.module.css";
import { Reticle } from "./reticle";

export function UI() {
  const ref = useRef<HTMLDivElement>(null);

  const targets = useStore((state) => state.targets);

  return (
    <div className={styles.ui} ref={ref}>
      <Reticle />
      {Object.keys(targets).map((id) => {
        return <LockingCrosshair key={id} id={id} />;
      })}
    </div>
  );
}
