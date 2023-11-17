import React, { useState, useEffect } from "react";
import styles from "./Snackbar.module.css";
import { MdErrorOutline } from "react-icons/md";
import { snackbarConsts } from "../Consts";

interface iSnackbar {
  type: keyof typeof snackbarConsts;
  setShowSnackbar?: any;
}

const Snackbar: React.FC<iSnackbar> = ({ type, setShowSnackbar }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
        if (setShowSnackbar) setShowSnackbar(null);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isVisible, setShowSnackbar]);

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

        {snackbarConsts[type].description && (
          <p className={styles.description}>
            {snackbarConsts[type].description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Snackbar;
