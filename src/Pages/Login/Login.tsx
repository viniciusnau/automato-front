import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Input from "../../Components/Forms/Input";
import Button from "../../Components/Forms/Button";
import Loading from "../../Components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "../../Services/Slices/meSlice";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../Auth/Auth";
import { handleKeyPress } from "../../Components/Helper";
import Snackbar from "../../Components/Snackbar/Snackbar";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { data, error, loading } = useSelector((state: any) => state.meSlice);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setForm((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    dispatch<any>(fetchMe(form));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (data.results) {
      isLoggedIn(true);
      navigate("/automato/");
    }
  }, [data.results, navigate]);

  return (
    <div className={styles.container}>
      {error && <Snackbar type="loginError" />}
      <div
        className={styles.loginForm}
        onKeyUp={(e) => handleKeyPress(e, handleSubmit, "Enter")}
      >
        <h2 className={styles.title}>Bem vindo(a)</h2>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="username">
            Usuário:
          </label>
          <Input
            className={styles.input}
            name="username"
            onChange={handleChange}
            value={form.username}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Senha:
          </label>
          <div className={styles.password}>
            <Input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={form.password}
            />
            <div className={styles.passwordIcon}>
              {showPassword ? (
                <HiOutlineEye size={24} onClick={handleShowPassword} />
              ) : (
                <HiOutlineEyeSlash size={24} onClick={handleShowPassword} />
              )}
            </div>
          </div>
        </div>
        <form
          action="https://automato.defensoria.sc.def.br/api/google-redirect/"
          method="get"
          className={styles.form}
        >
          <Button className={styles.google}>
            <img
              width="30rem"
              style={{ marginRight: ".5rem", padding: ".25rem" }}
              alt="Login com conta do Google"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
            <p className={styles.login}>Continuar com google</p>
          </Button>
        </form>
        <a href="/automato/alterar-senha/" className={styles.forgotPassword}>
          Esqueceu a senha?
        </a>
        <div className={styles.formButton}>
          <Button className={styles.button} onClick={handleSubmit}>
            {loading ? (
              <div
                style={{
                  position: "relative",
                  top: "-3rem",
                }}
              >
                <Loading size="2rem" type="spin" />
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
