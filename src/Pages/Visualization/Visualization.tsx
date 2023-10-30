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
import { JSX } from "react/jsx-runtime";

const Visualization = () => {
  const dispatch = useDispatch();
  const [handleEditModal, setHandleEditModal] = useState<boolean>(false);
  const { data, error, loading } = useSelector(
    (state: any) => state.transcriptSlice
  );
  const { state } = useLocation();
  const [content, setContent] = useState<any>();
  const [separatedWords, setSeparatedWords] = useState<any>();

  const handleMouseToggle = (word: any) => {
    setContent((prev: any) => {
      const updated = prev?.uncertain_words?.map((content: any, index: any) => {
        if (index === word) {
          return { ...content, showTooltip: !content.showTooltip };
        }
        return content;
      });
      return { ...prev, uncertain_words: updated };
    });
  };

  // const handleEditText = () => {
  //   setHandleEditModal(!handleEditModal);
  // };

  const handleCopyText = () => {
    navigator.clipboard.writeText(data?.transcript);
  };

  function formatTime(milliseconds: number) {
    const hours = Math.floor(milliseconds / 3600);
    const minutes = Math.floor((milliseconds % 3600) / 60);
    const remainingSeconds = Math.round(milliseconds % 60);

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

    return formattedTime;
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
    }
  };

  const highlightedText = () => {
    const highlightedElements: JSX.Element[] = [];
    separatedWords?.map((word: string, index: number) => {
      const previousWords = separatedWords
        .slice(Math.max(index - 10, 0), index)
        .join(" ");

      // const shouldHighlight = content?.uncertain_words?.find((item: any) => {
      //   return (
      //     item.previous_words.includes(previousWords) && item.word === word
      //   );
      // });

      const shouldHighlight = true;
      console.log(shouldHighlight);

      const element = (
        <React.Fragment key={index}>
          <div
            className={`${shouldHighlight && styles.uncertain}`}
            style={{
              backgroundColor: shouldHighlight
                ? decimalToHexColor(content?.uncertain_words[index]?.confidence)
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
            {shouldHighlight && shouldShowTooltip(content, index) && (
              <div className={styles.tpContainer}>
                <span className={styles.tooltip}>
                  Começa em:{" "}
                  {formatTime(content?.uncertain_words[index]?.start_time)},
                  Termina em:{" "}
                  {formatTime(content?.uncertain_words[index]?.end_time)}
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

  const shouldShowTooltip = (content: any, index: any) => {
    return content.uncertain_words
      .sort((a: any, b: any) => a.start_time - b.start_time)
      .some(() => {
        return content?.uncertain_words[index]?.showTooltip;
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
        {handleEditModal && (
          <Modal
            handleModal={handleEditModal}
            setHandleModal={setHandleEditModal}
            transcript={content?.transcript}
          />
        )}
      </div>
    </>
  );
};

export default Visualization;
