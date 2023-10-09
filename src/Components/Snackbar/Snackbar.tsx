import React, { useState, useEffect } from "react";
import styles from "./Snackbar.module.css";
import { MdErrorOutline } from "react-icons/md";
import { snackbarConsts } from "../Consts";

interface iSnackbar {
  type: keyof typeof snackbarConsts;
  setSnackbarType?: any;
}

const Snackbar: React.FC<iSnackbar> = ({ type, setSnackbarType }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
        if (setSnackbarType) setSnackbarType(null);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isVisible, setSnackbarType]);

  return (
    <div className={styles.snackbarContainer}>
      <div className={`${styles.snackbar} ${isVisible ? styles.visible : ""}`}>
        <div className={styles.title}>
          <MdErrorOutline
            size={24}
            color={snackbarConsts[type].color}
            className={styles.icon}
          />
          <h3 className={styles.text}>{snackbarConsts[type].title}</h3>
        </div>

        <p className={styles.description}>{snackbarConsts[type].description}</p>
      </div>
    </div>
  );
};

export default Snackbar;