import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import image from "../../Assets/image1.png";
import { useNavigate } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { isLoggedIn, logout } from "../../Auth/Auth";

const Header = () => {
  const navigate = useNavigate();
  const [isResponsive, setIsResponsive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 940);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.greenContainer} />
      <div className={styles.container}>
        <img
          src={image}
          className={styles.logo}
          alt="Logo"
          onClick={() => navigate("/automato/")}
        />
        <div
          className={isResponsive ? styles.buttonContainer : styles.navigation}
        >
          {isResponsive ? (
            <div>
              <button
                className={styles.responsiveButton}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <HiBars3 size={24} />
              </button>
              {isResponsive && isDropdownOpen && (
                <div className={styles.modal}>
                  <ul>
                    {isLoggedIn() && (
                      <>
                        <li
                          onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                            logout(navigate);
                          }}
                        >
                          <span
                            className={`${styles.route} ${styles.modalItem}`}
                          >
                            Sair
                          </span>
                        </li>
                        <li
                          onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                            navigate("automato/alterar-senha/");
                          }}
                        >
                          <span
                            className={`${styles.route} ${styles.modalItem}`}
                          >
                            Redefinir Senha
                          </span>
                        </li>
                        {toggleNav ? (
                          <li
                            onClick={() => {
                              setIsDropdownOpen(!isDropdownOpen);
                              setToggleNav(!toggleNav);
                              navigate("automato/transcrever/");
                            }}
                          >
                            <span
                              className={`${styles.route} ${styles.modalItem}`}
                            >
                              Transcrever
                            </span>
                          </li>
                        ) : (
                          <li
                            onClick={() => {
                              setIsDropdownOpen(!isDropdownOpen);
                              setToggleNav(!toggleNav);
                              navigate("automato/");
                            }}
                          >
                            <span
                              className={`${styles.route} ${styles.modalItem}`}
                            >
                              Transcrições
                            </span>
                          </li>
                        )}
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.navigation}>
              {isLoggedIn() && (
                <>
                  <span
                    className={`${styles.route} ${styles.logout}`}
                    onClick={() => logout(navigate)}
                  >
                    Sair
                  </span>
                  <span
                    className={`${styles.route} ${styles.logout}`}
                    onClick={() => navigate("/automato/alterar-senha/")}
                  >
                    Redefinir Senha
                  </span>
                  {toggleNav ? (
                    <span
                      className={`${styles.route} ${styles.logout}`}
                      onClick={() => {
                        setToggleNav(!toggleNav);
                        navigate("/automato/transcrever/");
                      }}
                    >
                      Transcrever
                    </span>
                  ) : (
                    <span
                      className={`${styles.route} ${styles.logout}`}
                      onClick={() => {
                        setToggleNav(!toggleNav);
                        navigate("/automato/");
                      }}
                    >
                      Transcrições
                    </span>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
