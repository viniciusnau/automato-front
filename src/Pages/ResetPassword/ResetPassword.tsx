import { useState } from "react";
import Input from "../../Components/Forms/Input";
import styles from "./ResetPassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Components/Forms/Button";
import { fetchResetPassword } from "../../Services/Slices/resetPassword";
import { handleKeyPress } from "../../Components/Helper";
import Snackbar from "../../Components/Snackbar/Snackbar";
import Loading from "../../Components/Loading/Loading";
import React from "react";

const ResetPassword = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState<any>({
    email: "",
  });
  const { data, error, loading } = useSelector(
    (state: any) => state.resetPassword
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch<any>(fetchResetPassword(form));
  };

  return (
    <div className={styles.container}>
      {error && <Snackbar type="resetError" />}
      {data && data.message && <Snackbar type="resetSuccess" />}
      <div
        className={styles.form}
        onKeyUp={(e) => handleKeyPress(e, handleSubmit, "Enter")}
      >
        <h2 className={styles.title}>Redefinir Senha</h2>
        <Input
          type="email"
          className={styles.input}
          placeholder="Seu endereço de e-mail"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <Button
          className={styles.button}
          onClick={handleSubmit}
          disabled={
            !(
              form.email.includes("@defensoria.sc.gov.br") ||
              form.email.includes("@defensoria.sc.def.br")
            )
          }
        >
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
            "Enviar E-mail"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
