"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import styles from "./index.module.css";
import { useStore } from "@/components/store";
import { transition, variants } from "./animation";
import { CrosshairState } from "./types";

export function LockingCrosshair({ id }: { id: string }) {
  const [crosshairState, setCrosshairState] = useState<CrosshairState>(
    CrosshairState.Idle
  );
  const [timerControls, setTimerControls] = useState<ReturnType<
    typeof animate
  > | null>(null);

  const ref = useRef<HTMLParagraphElement>(null);

  function predictedAccuracy() {
    switch (crosshairState) {
      case CrosshairState.Idle:
        return 0.3;
      case CrosshairState.Hold:
        return 0.2;
      case CrosshairState.Locking:
        return 0.1;
      case CrosshairState.Locked:
        return 0.01;
    }
  }

  function startTimer(from: number, to: number, callback = () => {}) {
    const controls = animate(from, to, {
      duration: from - to,
      onUpdate(value) {
        if (ref.current) ref.current.textContent = `${value.toFixed(2)}s`;
      },
      onComplete() {
        callback();
      },
    });
    setTimerControls(controls);
    return controls;
  }

  useEffect(() => {
    startTimer(2, 0, () => {
      setCrosshairState(CrosshairState.Hold);
    });
  }, []);

  useEffect(() => {
    function stopTimer() {
      if (!timerControls) return;
      timerControls.stop();
      if (ref.current) ref.current.textContent = "";
      setTimerControls(null);
    }
    stopTimer();

    switch (crosshairState) {
      case CrosshairState.Hold:
        startTimer(2, 0, () => {
          setCrosshairState(CrosshairState.Locking);
          stopTimer();
        });
        break;
      case CrosshairState.Locking:
        startTimer(1.5, 0, () => {
          setCrosshairState(CrosshairState.Locked);
          stopTimer();
        });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crosshairState]);

  const x = useStore((state) => state.targets[id].position.x);
  const y = useStore((state) => state.targets[id].position.y);
  const distance = useStore((state) => state.targets[id].position.z);

  return (
    <>
      <motion.div
        animate={{ x, y }}
        initial={false}
        className={styles.positionalWrapper}
        transition={{
          duration: predictedAccuracy(),
          ease: [0.28, 1.65, 0.57, 0.93],
        }}
      >
        <motion.div
          // @ts-expect-error framer doesn't like passing css variables
          variants={variants.crosshairWrapper}
          animate={crosshairState}
          className={styles.crosshairWrapper}
        >
          <motion.div
            variants={variants.crosshair}
            animate={crosshairState}
            transition={transition}
            className={styles.crosshair}
          >
            <motion.div
              initial={false}
              variants={variants.box}
              animate={crosshairState}
              className={styles.box}
            >
              <motion.div
                initial={false}
                variants={variants.circle}
                animate={crosshairState}
                transition={{ ...transition }}
                className={styles.lockCircle}
              />
            </motion.div>
            <motion.p
              initial={false}
              variants={variants.bottomContent}
              animate={crosshairState}
              transition={{ ...transition, duration: 0 }}
              className={styles.bottom}
            >
              {crosshairState === CrosshairState.Idle
                ? `${distance.toFixed(1)} m`
                : crosshairState}
            </motion.p>
            <motion.p
              ref={ref}
              initial={false}
              variants={variants.rightContent}
              animate={crosshairState}
              transition={{ ...transition, duration: 0 }}
              className={styles.right}
            />
          </motion.div>
          <motion.div
            variants={variants.chevronWrapper}
            animate={crosshairState}
            transition={transition}
            className={styles.chevrons}
          >
            <Chevron state={crosshairState} />
            <Chevron state={crosshairState} />
          </motion.div>
          <Cross />
        </motion.div>
      </motion.div>
    </>
  );
}

function Cross() {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={styles.cross}
    >
      <path d="M4.5 0.5V8.5" />
      <path d="M0.5 4.5L8.5 4.5" />
    </svg>
  );
}

function Chevron({ state }: { state: CrosshairState }) {
  return (
    <motion.svg
      animate={state}
      variants={variants.chevron}
      width="15"
      height="28"
      viewBox="0 0 15 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
    >
      <path d="M1 1L14 14L1 27" />
    </motion.svg>
  );
}
