import React, { useEffect, useState } from "react";
import styles from "./Visualization.module.css";
import global from "../../Components/Loading/Loading.module.css";
import { BiSolidEdit, BiSolidFile } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTranscript } from "../../Services/Slices/transcriptSlice";
import Snackbar from "../../Components/Snackbar/Snackbar";
import Loading from "../../Components/Loading/Loading";
import Modal from "./Modal/Modal";
import "../../colors.css";

interface iVisualization {
  colorInverted: boolean;
}

const Visualization: React.FC<iVisualization> = ({ colorInverted }) => {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(
    (state: any) => state.transcriptSlice
  );

  const colorInvertedState = useSelector(
    (state: any) => state.a11ySlice.colorInverted
  );

  const sketchSlice = useSelector((state: any) => state.sketchSlice);
  const { state } = useLocation();
  const [content, setContent] = useState<any>();
  const [separatedWords, setSeparatedWords] = useState<any>();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [handleModal, setHandleModal] = useState<boolean>(false);
  const [isColorInverted, setIsColorInverted] = useState<{
    [key: string]: boolean;
  }>({});
  const [sketch, setSketch] = useState<string>("");
  const [backup, setBackup] = useState<string>("");

  const handleCopyText = () => {
    const textArea = document.createElement("textarea");
    textArea.value = data?.transcript;
    document.body.appendChild(textArea);
    textArea.select();

    document.execCommand("copy");
    document.body.removeChild(textArea);
    setShowSnackbar(true);
  };

  const handleEditText = () => {
    setHandleModal(!handleModal);
  };

  function formatTime(milliseconds: number) {
    const hours = Math.floor(milliseconds / 3600);
    const minutes = Math.floor((milliseconds % 3600) / 60);
    const remainingSeconds = Math.round(milliseconds % 60);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  const handleMouseToggle = (content: any, value: boolean) => {
    if (content) {
      setContent((prev: any) => ({
        ...prev,
        uncertain_words: prev.uncertain_words.map((item: any) =>
          item === content ? { ...item, showTooltip: value } : item
        ),
      }));
    }
  };

  function decimalToHexColor(confidence: number) {
    confidence = Math.min(100, Math.max(0, confidence)) * 100;

    let red = Math.round(240);
    let green = Math.round((confidence / 100) * 255);
    let blue = 0;

    const redHex = red.toString(16).padStart(2, "0");
    const greenHex = green.toString(16).padStart(2, "0");
    const blueHex = blue.toString(16).padStart(2, "0");
    return `#${redHex}${greenHex}${blueHex}`;
  }

  const updateData = () => {
    if (data) {
      const createProperty = data?.uncertain_words?.map((content: any) => ({
        ...content,
        showTooltip: false,
      }));

      setContent({
        ...data,
        uncertain_words: createProperty,
      });

      setSeparatedWords(data?.transcript?.split(" "));
      setSketch(
        data?.edited_transcript ? data?.edited_transcript : data.transcript
      );
      setBackup(data.transcript);
    }
  };

  const highlightedText = () => {
    const highlightedElements: JSX.Element[] = [];
    separatedWords?.map((word: string, index: number) => {
      const handleRange = index <= 10 ? index : 10;
      const previousWords = separatedWords
        .slice(index - handleRange, index)
        .join(" ");

      var shouldHighlight = content?.uncertain_words?.find((item: any) => {
        return item.previous_words === previousWords && item.word === word;
      });

      const element = (
        <React.Fragment key={index}>
          <div
            className={`${shouldHighlight && styles.uncertain}`}
            style={{
              backgroundColor: shouldHighlight
                ? decimalToHexColor(shouldHighlight?.confidence)
                : "transparent",
            }}
            onMouseEnter={() => {
              handleMouseToggle(shouldHighlight, true);
            }}
            onMouseLeave={() => {
              handleMouseToggle(shouldHighlight, false);
            }}
          >
            <span
              className={styles.word}
              style={{ color: isColorInverted ? "#fafafa" : "initial" }}
            >
              {word}
            </span>
            {shouldHighlight?.showTooltip && (
              <div className={styles.tpContainer}>
                <span className={styles.tooltip}>
                  Começa em: {formatTime(shouldHighlight?.start_time)}, Termina
                  em: {formatTime(shouldHighlight?.end_time)}
                </span>
              </div>
            )}
          </div>
          <p> </p>
        </React.Fragment>
      );

      highlightedElements.push(element);
    });
    return highlightedElements;
  };

  useEffect(() => {
    if (state) {
      dispatch<any>(fetchTranscript(state.toString()));
    }
  }, [dispatch, state]);

  useEffect(() => {
    if (data) {
      updateData();
    }
  }, [data]);

  useEffect(() => {
    setIsColorInverted(colorInvertedState);
  }, [colorInvertedState]);

  if (loading)
    return (
      <div className={global.loading}>
        <Loading size="5rem" type="spin" />
      </div>
    );

  return (
    <>
      {error && <Snackbar type="transcriptError" />}
      {showSnackbar && (
        <Snackbar setShowSnackbar={setShowSnackbar} type="copySuccess" />
      )}
      {sketchSlice.data?.response && <Snackbar type="sketchSuccess" />}
      {sketchSlice.error && <Snackbar type="sketchError" />}
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <div className={styles.buttonContainer}>
            <BiSolidEdit
              size={28}
              onClick={handleEditText}
              className={styles.copy}
              style={{ color: isColorInverted ? "#fafafa" : "initial" }}
            />
            <BiSolidFile
              size={28}
              onClick={handleCopyText}
              className={styles.copy}
              style={{ color: isColorInverted ? "#fafafa" : "initial" }}
            />
          </div>
          <div className={styles.text}>{highlightedText()}</div>
          {handleModal && (
            <Modal
              handleModal={handleModal}
              setHandleModal={setHandleModal}
              setSketch={setSketch}
              sketch={sketch}
              backup={backup}
              id={state}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Visualization;
