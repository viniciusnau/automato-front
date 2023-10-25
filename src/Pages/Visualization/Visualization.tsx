import styles from "./Visualization.module.css";
import {
  BiSolidFile,
  // , BiSolidEdit
} from "react-icons/bi";
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

  const handleMouseToggle = (index: any) => {
    setContent((prevData: any) => {
      const updatedTooltip = prevData?.uncertain_words?.map(
        (word: any, localization: any) => {
          if (localization === index) {
            return { ...word, showTooltip: !word.showTooltip };
          }
          return word;
        }
      );
      return { ...prevData, uncertain_words: updatedTooltip };
    });
  };

  // const handleEditText = () => {
  //   setHandleModal(!handleModal);
  // };

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
    const uncertainWordsMap = new Map();

    content?.uncertain_words?.forEach((item: any) => {
      const itemWords = item.word.split(" ");
      itemWords.forEach((word: any) => {
        if (uncertainWordsMap.has(word)) {
          uncertainWordsMap.get(word).push(item);
        } else {
          uncertainWordsMap.set(word, [item]);
        }
      });
    });

    const highlightedElements = [];

    for (let index = 0; index < separatedWords?.length; index++) {
      const word = separatedWords[index];
      const matchUncertain = uncertainWordsMap.get(word);
      const previousWords = separatedWords
        .slice(Math.max(index - 10, 0), index)
        .join(" ");

      const shouldHighlight = matchUncertain?.some((item: any) => {
        return (
          item.previous_words.includes(previousWords) &&
          item.word.includes(word)
        );
      });

      const element = (
        <React.Fragment key={index}>
          <div
            className={`${shouldHighlight ? styles.uncertain : ""}`}
            style={{
              backgroundColor: shouldHighlight
                ? decimalToHexColor(matchUncertain[0].confidence)
                : "transparent",
            }}
            onMouseEnter={() => {
              shouldHighlight && handleMouseToggle(index);
            }}
            onMouseLeave={() => {
              shouldHighlight && handleMouseToggle(index);
            }}
          >
            <span className={styles.word}>{word}</span>
            {shouldShowTooltip(word, content, index) && (
              <div className={styles.tpContainer}>
                <span className={styles.tooltip}>
                  Começa em: {formatTime(matchUncertain[0].start_time)}, Termina
                  em: {formatTime(matchUncertain[0].end_time)}
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

  const shouldShowTooltip = (word: any, content: any, index: any) => {
    return content.uncertain_words.some((item: any) => {
      const itemWords = item.word.split(" ");
      const previousWords = separatedWords
        .slice(Math.max(index - 10, 0), index)
        .join(" ");
      return (
        itemWords.includes(word) &&
        item.previous_words.includes(previousWords) &&
        content?.uncertain_words[index]?.showTooltip
      );
    });
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
            {/* <BiSolidEdit
              size={28}
              onClick={handleEditText}
              className={styles.copy}
            /> */}
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
