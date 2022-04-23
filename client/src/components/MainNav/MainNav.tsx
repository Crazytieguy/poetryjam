import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./MainNav.module.css";

const activeClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.active : undefined;

const MainNav: FC = () => {
  return (
    <nav className={styles.mainNav}>
      <ul className={styles.mainNav}>
        <li>
          <NavLink to="/" className={activeClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/create" className={activeClass}>
            New
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
