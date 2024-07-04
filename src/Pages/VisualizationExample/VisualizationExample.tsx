import React, { useEffect, useState } from "react";
import styles from "./VisualizationExample.module.css";
import global from "../../Components/Loading/Loading.module.css";
import { BiSolidEdit, BiSolidFile } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchTranscript } from "../../Services/Slices/transcriptSlice";
import Loading from "../../Components/Loading/Loading";
import Modal from "./Modal/Modal";
import "../../colors.css";

interface iVisualization {
  colorInverted: boolean;
}

const VisualizationExample: React.FC<iVisualization> = ({ colorInverted }) => {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(
      (state: any) => state.transcriptSlice
  );
  const [content, setContent] = useState<any>();
  const [separatedWords, setSeparatedWords] = useState<any>();
  const [handleModal, setHandleModal] = useState<boolean>(false);
  const [isColorInverted, setIsColorInverted] = useState<boolean>(colorInverted);
  const [sketch, setSketch] = useState<string>("");
  const [backup, setBackup] = useState<string>("");

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

      const shouldHighlight = content?.uncertain_words?.find((item: any) => {
        return item.previous_words === previousWords && item.word === word;
      });

      const element = (
          <React.Fragment key={index}>
            <div
                className={`${shouldHighlight ? styles.uncertain : ""}`}
                style={{
                  backgroundColor: shouldHighlight
                      ? decimalToHexColor(shouldHighlight?.confidence)
                      : "transparent",
                  color: isColorInverted ? "#fafafa" : "initial",
                }}
            >
              <span className={styles.word}>{word}</span>
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
    dispatch<any>(fetchTranscript("50"));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      updateData();
    }
  }, [data]);

  if (loading)
    return (
        <div className={global.loading}>
          <Loading size="5rem" type="spin" />
        </div>
    );

  return (
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <div className={styles.buttonContainer}>
            <div id='edit' >
              <BiSolidEdit
                  size={28}
                  onClick={handleEditText}
                  className={styles.copy}
                  style={{ color: isColorInverted ? "#fafafa" : "initial" }}
              />
            </div>
            <div id='copy' >
              <BiSolidFile
                  size={28}
                  className={styles.copy}
                  style={{ color: isColorInverted ? "#fafafa" : "initial" }}
              />
            </div>
          </div>
          <div className={styles.text}>{highlightedText()}</div>
          {handleModal && (
              <Modal
                  handleModal={handleModal}
                  setHandleModal={setHandleModal}
                  setSketch={setSketch}
                  sketch={sketch}
                  backup={backup}
                  id={50}
              />
          )}
        </div>
      </div>
  );
};

export default VisualizationExample;
