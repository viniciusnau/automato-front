import styles from "./Visualization.module.css";
import { BiSolidFile, BiSolidEdit } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTranscript } from "../../Services/Slices/transcriptSlice";
import Loading from "../../Components/Loading/Loading";
import Modal from "./Modal/Modal";
import Snackbar from "../../Components/Snackbar/Snackbar";

const Visualization = () => {
  const dispatch = useDispatch();
  const [handleModal, setHandleModal] = useState<boolean>(false);
  const { data, error, loading } = useSelector(
    (state: any) => state.transcriptSlice
  );
  const { state } = useLocation();
  const [content, setContent] = useState<any>();
  const [separatedWords, setSeparatedWords] = useState<any>();

  const handleMouseToggle = (wordData: any) => {
    setContent((prevData: any) => {
      const updatedUncertainWords = prevData?.uncertain_words?.map(
        (word: any) => {
          if (word === wordData) {
            return { ...word, showTooltip: !word.showTooltip };
          }
          return word;
        }
      );
      return { ...prevData, uncertain_words: updatedUncertainWords };
    });
  };

  const handleEditText = () => {
    setHandleModal(!handleModal);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(data?.transcript);
  };

  function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.round(seconds % 60);

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

    return formattedTime;
  }

  function decimalToHexColor(percentage: number) {
    percentage = Math.min(100, Math.max(0, percentage)) * 100;

    let red = Math.round(240);
    let green = Math.round((percentage / 100) * 255);
    let blue = 0;

    const redHex = red.toString(16).padStart(2, "0");
    const greenHex = green.toString(16).padStart(2, "0");
    const blueHex = blue.toString(16).padStart(2, "0");
    return `#${redHex}${greenHex}${blueHex}`;
  }

  const updateData = () => {
    if (data) {
      const lowerCaseData = data?.uncertain_words?.map((content: any) => ({
        ...content,
        showTooltip: false,
      }));

      setContent({
        ...data,
        uncertain_words: lowerCaseData,
      });

      setSeparatedWords(data?.transcript?.split(" "));
    }
  };

  const highlightedText = () => {
    const uncertainWordsMap = new Map();

    content?.uncertain_words?.forEach((item: any) => {
      const itemWords = item.word.split(" ");
      itemWords.forEach((word: any) => {
        uncertainWordsMap.set(word, item);
      });
    });

    const highlightedElements = [];
    for (let index = 0; index < separatedWords?.length; index++) {
      const handleRange = index <= 10 ? index : 10;
      const word = separatedWords[index];
      const matchUncertain = uncertainWordsMap.get(word);
      const matchPrevious = matchUncertain?.previous_words;
      const previousWords = separatedWords
        .slice(index - handleRange, index - 1)
        .join(" ");

      const shouldHighlight =
        matchPrevious && matchPrevious?.match(previousWords);

      const element = (
        <React.Fragment key={index}>
          <div
            className={`${shouldHighlight ? styles.uncertain : ""}`}
            style={{
              backgroundColor: shouldHighlight
                ? decimalToHexColor(matchUncertain.confidence)
                : "transparent",
            }}
            onMouseEnter={() => {
              shouldHighlight && handleMouseToggle(matchUncertain);
            }}
            onMouseLeave={() => {
              shouldHighlight && handleMouseToggle(matchUncertain);
            }}
          >
            <span className={styles.word}>{word}</span>
            {shouldHighlight && matchUncertain.showTooltip && (
              <div className={styles.tpContainer}>
                <span className={styles.tooltip}>
                  Começa em: {formatTime(matchUncertain.start_time)}, Termina
                  em: {formatTime(matchUncertain.end_time)}
                </span>
              </div>
            )}
          </div>
          <p> </p>
        </React.Fragment>
      );

      highlightedElements.push(element);
    }

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
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <div className={styles.buttonContainer}>
            <BiSolidEdit
              size={28}
              onClick={handleEditText}
              className={styles.copy}
            />
            <BiSolidFile
              size={28}
              onClick={handleCopyText}
              className={styles.copy}
            />
          </div>
          <div className={styles.text}>{highlightedText()}</div>
        </div>
        {handleModal && (
          <Modal
            handleModal={handleModal}
            setHandleModal={setHandleModal}
            transcript={data?.transcript}
          />
        )}
      </div>
    </>
  );
};

export default Visualization;
