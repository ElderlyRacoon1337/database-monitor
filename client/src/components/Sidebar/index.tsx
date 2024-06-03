import React from "react";
import styles from "./Sidebar.module.scss";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const page = useLocation().pathname;
  return (
    <div className={styles.root}>
      <ul>
        <Link to={"/databases"} className={styles.link}>
          <p className={page == "/databases" ? styles.active : ""}>
            Базы данных
          </p>
        </Link>
        <Link to={"/users"} className={styles.link}>
          <p className={page == "/users" ? styles.active : ""}>Пользователи</p>
        </Link>
        <Link to={"/resources"} className={styles.link}>
          <p className={page == "/resources" ? styles.active : ""}>Ресурсы</p>
        </Link>
        <Link to={"/network"} className={styles.link}>
          <p className={page == "/network" ? styles.active : ""}>Сеть</p>
        </Link>
      </ul>
    </div>
  );
};
