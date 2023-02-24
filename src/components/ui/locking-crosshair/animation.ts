import { CrosshairState as State } from "./types";

export const transition = { ease: [0.6, -0.05, 0.01, 0.99], duration: 0.15 };

const slowFlash = {
  opacity: [0, 1, 1, 1, 1],
  transition: {
    duration: 0.4,
    repeat: Infinity,
  },
};

const fastFlash = {
  opacity: [0, 1, 1],
  transition: {
    duration: 0.2,
    repeat: Infinity,
  },
};

const crosshairWrapperVariants = {
  [State.Locking]: {
    "--color": "var(--amber)",
  },
  [State.Locked]: {
    "--color": "var(--red)",
  },
};

const crosshairVariants = {
  [State.Hold]: {
    rotate: "45deg",
    transition: {
      duration: 0.2,
    },
  },
  [State.Locking]: {
    rotate: "45deg",
  },
};

const circleProps = {
  opacity: 1,
  width: "90%",
  height: "90%",
  borderStyle: "solid",
};

const circleVariants = {
  [State.Idle]: {
    ...circleProps,
    borderStyle: "dashed",
  },
  [State.Hold]: {
    ...circleProps,
    borderStyle: "dashed",
  },
  [State.Locking]: {
    ...circleProps,
    width: ["300%", "90%"],
    height: ["300%", "90%"],
    transition: {
      duration: 1.5,
    },
  },
  [State.Locked]: {
    ...circleProps,
    backgroundColor: `rgba(255, 0, 0, 0.1)`,
  },
};

const defaultChevronProps = {
  left: "-2rem",
  right: "-2rem",
};

const chevronWrapperVariants = {
  [State.Idle]: {
    ...defaultChevronProps,
  },
  [State.Hold]: {
    ...defaultChevronProps,
  },
  [State.Locking]: {
    ...defaultChevronProps,
  },
  [State.Locked]: {
    left: "1rem",
    right: "1rem",
    transition,
  },
};

const chevronVariants = {
  [State.Idle]: {
    opacity: 0,
  },
  [State.Hold]: {
    opacity: 0,
  },
  [State.Locking]: {
    ...slowFlash,
  },
  [State.Locked]: {
    ...fastFlash,
  },
};

const rightContentVariants = {
  [State.Idle]: {
    opacity: 0,
  },
  [State.Hold]: {
    opacity: 1,
  },
  [State.Locking]: {
    ...slowFlash,
  },
  [State.Locked]: {
    opacity: 0,
  },
};

const bottomContentVariants = {
  [State.Idle]: {
    opacity: 1,
  },
  [State.Hold]: {
    opacity: 1,
  },
  [State.Locking]: {
    ...slowFlash,
  },
  [State.Locked]: {
    ...fastFlash,
  },
};

const boxVariants = {
  [State.Idle]: {
    borderWidth: 0,
  },
  [State.Hold]: {
    borderWidth: 1,
    transition: {
      duration: 0,
    },
  },
  [State.Locking]: {
    borderWidth: 1,
  },
  [State.Locked]: {
    borderWidth: 1,
  },
};

export const variants = {
  crosshairWrapper: crosshairWrapperVariants,
  crosshair: crosshairVariants,
  circle: circleVariants,
  chevronWrapper: chevronWrapperVariants,
  chevron: chevronVariants,
  rightContent: rightContentVariants,
  bottomContent: bottomContentVariants,
  box: boxVariants,
};
