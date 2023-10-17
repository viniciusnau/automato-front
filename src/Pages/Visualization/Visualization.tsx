import styles from "./Visualization.module.css";
import { BiSolidFile, BiSolidShare, BiSolidEdit } from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTranscript } from "../../Services/Slices/transcriptSlice";

const Visualization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, error, loading } = useSelector(
    (state: any) => state.transcriptSlice
  );
  const [content, setContent] = useState<any>();

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

  const handleEditText = () => {};

  const handleCopyText = () => {
    navigator.clipboard.writeText(data.transcript);
  };

  function formatTime(milliseconds: number) {
    var hours = Math.floor(milliseconds / (60 * 60 * 1000));
    var divisor_for_minutes = milliseconds % (60 * 60 * 1000);
    var minutes = Math.floor(divisor_for_minutes / (60 * 1000));
    var divisor_for_seconds = divisor_for_minutes % (60 * 1000);
    var seconds = Math.ceil(divisor_for_seconds / 1000);
    var newSeconds =
      seconds < 10 ? "0" + seconds.toString() : seconds.toString();
    return (
      (hours ? hours + ":" : "") +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      newSeconds
    );
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

  const updateUncertainWords = () => {
    const insertedTooltip = data?.uncertain_words?.map((content: any) => ({
      ...content,
      word: content.word.toLowerCase(),
      showTooltip: false,
    }));

    setContent({
      ...data,
      uncertain_words: insertedTooltip,
    });
  };
  // const highlightedText = () => {
  //   const words = content?.transcript?.toLowerCase().split(" ");
  //   return words?.map((element: any, index: number) => {
  //     const matchUncertain = content.uncertain_words?.find((item: any) => {
  //       const handleRange = Math.min(index, 10);
  //       console.log("element: ", element);

  //       const previous_words =
  //         index >= handleRange
  //           ? words
  //               .slice(index - handleRange, index)
  //               .map((word: any) => word.toLowerCase())
  //               .join(" ")
  //           : "";

  //       return item.word === item && item.previous_words === previous_words;
  //     });

  //     return (
  //       <React.Fragment key={index}>
  //         <p
  //           className={`${matchUncertain && styles.uncertain}`}
  //           style={{
  //             backgroundColor: matchUncertain
  //               ? decimalToHexColor(matchUncertain.confidence)
  //               : "transparent",
  //           }}
  //           onMouseEnter={() => {
  //             matchUncertain && handleMouseToggle(matchUncertain);
  //           }}
  //           onMouseLeave={() => {
  //             matchUncertain && handleMouseToggle(matchUncertain);
  //           }}
  //         >
  //           <span className={styles.word}>{words}</span>
  //           {matchUncertain && matchUncertain.showTooltip && (
  //             <span className={styles.tooltip}>
  //               Começa em: {formatTime(matchUncertain.start_time)}, Termina em:{" "}
  //               {formatTime(matchUncertain.end_time)}
  //             </span>
  //           )}
  //         </p>
  //         <p> </p>
  //       </React.Fragment>
  //     );
  //   });
  // };

  const highlightedText = () => {
    const words = content?.transcript?.toLowerCase().split(" ");
    const uncertainWordsMap = new Map();

    content?.uncertain_words?.forEach((item: any) => {
      const itemWords = item.word.toLowerCase().split(" ");
      itemWords.forEach((word: any) => {
        uncertainWordsMap.set(word, item);
      });
    });

    const handleRange = 10;
    const highlightedElements = [];

    for (let index = 0; index < words?.length; index++) {
      const word = words[index];
      const previousWords = words
        .slice(Math.max(0, index - handleRange), index)
        .join(" ")
        .toLowerCase();
      const matchUncertain = uncertainWordsMap.get(word);

      const element = (
        <React.Fragment key={index}>
          <p
            className={`${matchUncertain ? styles.uncertain : ""}`}
            style={{
              backgroundColor: matchUncertain
                ? decimalToHexColor(matchUncertain.confidence)
                : "transparent",
            }}
            onMouseEnter={() => {
              matchUncertain && handleMouseToggle(matchUncertain);
            }}
            onMouseLeave={() => {
              matchUncertain && handleMouseToggle(matchUncertain);
            }}
          >
            <span className={styles.word}>{word}</span>
            {matchUncertain && matchUncertain.showTooltip && (
              <span className={styles.tooltip}>
                Começa em: {formatTime(matchUncertain.start_time)}, Termina em:{" "}
                {formatTime(matchUncertain.end_time)}
              </span>
            )}
          </p>
          <p> </p>
        </React.Fragment>
      );

      highlightedElements.push(element);
    }

    return highlightedElements;
  };

  useEffect(() => {
    dispatch<any>(fetchTranscript(state));
  }, [dispatch, state]);

  useEffect(() => {
    if (data) {
      updateUncertainWords();
    }
  }, [data]);

  // ...

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <BiSolidShare
          size={20}
          className={styles.return}
          onClick={() => navigate(-1)}
        />
      </div>
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
    </div>
  );
};

export default Visualization;
