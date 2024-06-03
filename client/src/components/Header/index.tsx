import React from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/stats.svg";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className={styles.root}>
      <div className={styles.header}>
        <Link to={"/"} className={styles.link}>
          <div className={styles.logo}>
            <img src={logo}></img>
            <h2>DBMetrics</h2>
          </div>
        </Link>
        <div className={styles.button}>Войти</div>
      </div>
    </header>
  );
};
