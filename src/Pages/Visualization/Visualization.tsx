import styles from "./Visualization.module.css";
import { BiSolidFile, BiSolidShare, BiSolidEdit } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
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

  const updateData = () => {
    if (data) {
      const lowerCaseData = data?.uncertain_words?.map((content: any) => ({
        ...content,
        word: content?.word?.toLowerCase(),
        showTooltip: false,
      }));

      setContent({
        ...data,
        uncertain_words: lowerCaseData,
      });

      setSeparatedWords(data?.transcript?.toLowerCase().split(" "));
    }
  };

  // const highlightedText = () => {
  //   const uncertainWordsMap = new Map();

  //   content?.uncertain_words?.forEach((item: any) => {
  //     const itemWords = item.word.toLowerCase().split(" ");
  //     itemWords.forEach((word: any) => {
  //       uncertainWordsMap.set(word, item);
  //     });
  //   });

  //   const handleRange = 10;
  //   const highlightedElements = [];

  //   for (let index = 0; index < separatedWords?.length; index++) {
  //     const word = separatedWords[index];
  //     const previousWords = separatedWords
  //       .slice(Math.max(0, index - handleRange), index)
  //       .join(" ")
  //       .toLowerCase();
  //     console.log("previousWords: ", previousWords);
  //     const matchUncertain = uncertainWordsMap.get(word);
  //     console.log("matchUncertain: ", matchUncertain);

  //     const element = (
  //       <React.Fragment key={index}>
  //         <p
  //           className={`${matchUncertain ? styles.uncertain : ""}`}
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
  //           <span className={styles.word}>{word}</span>
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

  //     highlightedElements.push(element);
  //   }

  //   return highlightedElements;
  // };

  const highlightedText = () => {
    const uncertainWordsMap = new Map();

    content?.uncertain_words?.forEach((item: any) => {
      const itemWords = item.word.toLowerCase().split(" ");
      itemWords.forEach((word: any) => {
        uncertainWordsMap.set(word, item);
      });
    });

    const handleRange = 10;
    const highlightedElements = [];

    for (let index = 0; index < separatedWords?.length; index++) {
      const word = separatedWords[index];
      const previousWords = separatedWords
        .slice(Math.max(0, index - handleRange), index)
        .join(" ")
        .toLowerCase();

      const matchUncertain = uncertainWordsMap.get(word);

      // Check if both the current word and its previous words are marked as uncertain
      const shouldHighlight = false;
      // uncertainWordsMap.has(word) &&
      // matchUncertain.previous_words.has(previousWords);
      // console.log(
      //   "matchUncertain.previous_words: ",
      //   matchUncertain?.previous_words
      // );
      // console.log("previousWords: ", previousWords);
      console.log("equal: ", matchUncertain?.previous_words === previousWords);

      const element = (
        <React.Fragment key={index}>
          <p
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
      updateData();
    }
  }, [data]);

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
