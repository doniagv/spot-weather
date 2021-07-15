import { WiSunset } from "react-icons/wi";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.NavBar}>
      <div className={styles.NavLogo}>
        <WiSunset />
      </div>

      <div>
        <button className={styles.NavButton}>Log in</button>
      </div>
    </div>
  );
};

export default Navbar;
