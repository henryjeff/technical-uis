import { DashedCircle } from "@/components/ui/elements/dashed-circle";
import { PentagonArrow } from "../elements/pentagon-arrow";
import styles from "./index.module.css";

export function Reticle() {
  return (
    <div className={styles.reticle}>
      {/* <div className={styles.arrows}>
        <PentagonArrow flipX />
        <PentagonArrow />
      </div> */}
      <DashedCircle
        dash={{ dash: 0, gap: 0 }}
        size={400}
        strokeWidth={1}
        className={styles.basis}
      />
      {/* <DashedCircle
        rotate={-0.4}
        strokeWidth={15}
        dash={{ dash: 3, gap: 30 }}
        size={540}
      /> */}
    </div>
  );
}
