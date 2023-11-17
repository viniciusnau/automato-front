import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import Button from "../../../Components/Forms/Button";
import Loading from "../../../Components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "../../../Components/Snackbar/Snackbar";
import { fetchSketch } from "../../../Services/Slices/sketchSlice";
import { BiSolidFile } from "react-icons/bi";

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
  const [isColorInverted, setIsColorInverted] = useState<{
    [key: string]: boolean;
  }>({});
  const colorInvertedState = useSelector(
    (state: any) => state.a11ySlice.colorInverted
  );
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const handleReset = () => {
    setSketch(backup);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    setSketch(e.target.value);
  };

  const handleCopyText = () => {
    const textArea = document.createElement("textarea");
    textArea.value = sketch;
    document.body.appendChild(textArea);
    textArea.select();

    document.execCommand("copy");
    document.body.removeChild(textArea);
    setShowSnackbar(true);
  };

  const handleSubmit = () => {
    const body = {
      transcription: sketch,
      audio_id: id,
    };
    dispatch<any>(fetchSketch(body));
    setShowSnackbar(true);
    setHandleModal(false);
  };

  useEffect(() => {
    setIsColorInverted(colorInvertedState);
  }, [colorInvertedState]);

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
  console.log("isColorInverted: ", isColorInverted);
  return (
    <div className={styles.container}>
      {showSnackbar && <Snackbar type="copySuccess" />}
      {showSnackbar && error && <Snackbar type="sketchError" />}
      {showSnackbar && data.results?.response && (
        <Snackbar type="sketchSuccess" />
      )}
      <div className={styles.modal}>
        <div className={styles.dashboard}>
          <BiSolidFile
            size={28}
            onClick={handleCopyText}
            className={styles.copy}
          />
        </div>
        <textarea
          name="content"
          onChange={handleChange}
          className={styles.textarea}
          value={sketch}
        />

        <div className={styles.controls}>
          <Button onClick={handleReset} className={styles.button}>
            Redefinir
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
