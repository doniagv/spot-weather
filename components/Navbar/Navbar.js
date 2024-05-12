import { WiSunset } from "react-icons/wi";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.NavBar}>
      <div className={styles.NavLogo}>
        <WiSunset />
      </div>
    </div>
  );
}
