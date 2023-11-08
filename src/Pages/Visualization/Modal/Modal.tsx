import React from "react";
import styles from "./Modal.module.css";
import Button from "../../../Components/Forms/Button";
import Loading from "../../../Components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "../../../Components/Snackbar/Snackbar";
import { fetchSketch } from "../../../Services/Slices/sketchSlice";

interface iModal {
  setHandleModal: any;
  handleModal: boolean;
  setSketch: any;
  sketch: string;
  backup: string;
  id: number;
}

const Modal = ({
  setHandleModal,
  handleModal,
  setSketch,
  sketch,
  backup,
  id,
}: iModal) => {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(
    (state: any) => state.sketchSlice
  );

  const handleReset = () => {
    setSketch(backup);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    setSketch(e.target.value);
  };

  const handleSubmit = () => {
    const body = {
      transcription: sketch,
      audio_id: id,
    };
    dispatch<any>(fetchSketch(body));
    setHandleModal(false);
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          height: "50vw",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loading size="5rem" type="spin" />
      </div>
    );

  return (
    <div className={styles.container}>
      {error && <Snackbar type="sketchError" />}
      {data.results?.response && <Snackbar type="sketchSuccess" />} {/*  */}
      <div className={styles.modal}>
        <textarea
          name="content"
          onChange={handleChange}
          className={styles.textarea}
          value={sketch}
        />

        <div className={styles.controls}>
          <Button onClick={handleReset} className={styles.button}>
            Resetar
          </Button>
          <Button
            onClick={() => {
              setHandleModal(!handleModal);
            }}
            className={styles.button}
          >
            Voltar
          </Button>
          <Button onClick={handleSubmit} className={styles.button}>
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
