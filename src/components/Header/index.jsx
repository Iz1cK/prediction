import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

const Header = (props) => {
  return (
    <>
      <div className={styles.head}>
        <span className={styles.headerElement}>Home</span>
        <span className={styles.headerElement}>Profile</span>
        <span className={styles.headerElement}>Logout</span>
      </div>
    </>
  );
};

export default Header;
