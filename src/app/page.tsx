import Image from "next/image";
import { Ubuntu_Mono } from "@next/font/google";
import { UI } from "@/components/ui";
import styles from "./page.module.css";
import { Scene } from "@/components/3d/scene";

const ubuntuMono = Ubuntu_Mono({
  weight: "400",
  variable: "--mono-font",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={ubuntuMono.variable}>
      <div className={styles.page}>
        <UI />
        <Scene />
      </div>
    </div>
  );
}
