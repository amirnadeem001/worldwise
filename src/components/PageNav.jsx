import { Link, NavLink } from "react-router-dom";
import style from "../components/PageNav.module.css";
import Logo from "./Logo";

function PageNav() {
  console.log(window.location.pathname);
  return (
    <nav className={style.nav}>
      <Link to="/">
        <Logo />
      </Link>
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        {window.location.pathname === "/login" ? null : (
          <li>
            <NavLink className="cta" to="/login">
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default PageNav;
