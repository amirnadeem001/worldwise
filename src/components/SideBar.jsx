import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import Footer from "../components/Footer";
import AppNav from "./AppNav";
import { Link, Outlet } from "react-router-dom";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Link to="/">
        <Logo />
      </Link>
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default SideBar;
