import React, {
  // useEffect,
  useState,
} from "react";
import styles from "./Modal.module.css";
// import Input from "../../../Components/Forms/Input";
import Button from "../../../Components/Forms/Button";
import Loading from "../../../Components/Loading/Loading";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
import Snackbar from "../../../Components/Snackbar/Snackbar";

interface iModal {
  setHandleModal: any;
  handleModal: any;
  transcript: any;
}

const Modal = ({ setHandleModal, handleModal, transcript }: iModal) => {
  //   const dispatch = useDispatch();
  const [content, setContent] = useState(transcript);
  const { data, error, loading } = useSelector((state: any) => state.meSlice);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    // dispatch<any>(fetchMe(content));
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
      {error && <Snackbar type="editError" />}
      {data.results && <Snackbar type="editSuccess" />}
      <div className={styles.modal}>
        <textarea
          name="content"
          onChange={handleChange}
          className={styles.textarea}
          value={content}
        />

        <div className={styles.controls}>
          <Button
            onClick={() => {
              setHandleModal(!handleModal);
            }}
            className={styles.button}
          >
            Cancelar
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
