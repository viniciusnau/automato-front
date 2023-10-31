import React, { useEffect, useState } from "react";
import styles from "./Visualization.module.css";
import { BiSolidFile } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTranscript } from "../../Services/Slices/transcriptSlice";
import Snackbar from "../../Components/Snackbar/Snackbar";
import Loading from "../../Components/Loading/Loading";

const Visualization = () => {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(
    (state: any) => state.transcriptSlice
  );
  const { state } = useLocation();
  const [content, setContent] = useState<any>();
  const [separatedWords, setSeparatedWords] = useState<any>();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCopyText = () => {
    navigator.clipboard.writeText(data?.transcript);
    setShowSnackbar(true);
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
    if (showSnackbar) {
      const timer = setTimeout(() => {
        setShowSnackbar(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

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
    <>
      {error && <Snackbar type="transcriptError" />}
      {showSnackbar && <Snackbar type="copySuccess" />}
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <div className={styles.buttonContainer}>
            <BiSolidFile
              size={28}
              onClick={handleCopyText}
              className={styles.copy}
            />
          </div>
          <div className={styles.text}>{highlightedText()}</div>
        </div>
      </div>
    </>
  );
};

export default Visualization;
