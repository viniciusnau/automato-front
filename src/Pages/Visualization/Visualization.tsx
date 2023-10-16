import styles from "./Visualization.module.css";
import { BiSolidFile, BiSolidShare, BiSolidEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

// interface iVisualization {
//   data?: {
//     transcript: string;
//     uncertain_words: [{ word: string; previous_words:string; confidence:number; start_time: number; end_time: number }];
//   };
// }

const Visualization = () =>
  // { data }: iVisualization
  {
    const navigate = useNavigate();
    const [data, setData] = useState<any>({
      transcript:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      uncertain_words: [
        {
          word: "elit,",
          previous_words: "consectetur adipiscing",
          confidence: 0,
          start_time: 705,
          end_time: 3705,
        },
        {
          word: "eiusmod",
          previous_words: "sed do",
          confidence: 0.25,
          start_time: 1705,
          end_time: 4705,
        },
        {
          word: "labore",
          previous_words: "incididunt ut",
          confidence: 0.5,
          start_time: 2705,
          end_time: 5705,
        },
        {
          word: "aliqua.",
          previous_words: "dolore magna",
          confidence: 0.705,
          start_time: 3705,
          end_time: 6705,
        },
        {
          word: "veniam,",
          previous_words: "ad minim",
          confidence: 1,
          start_time: 1000 * 60 * 3.5,
          end_time: 1000 * 60 * 60,
        },
      ],
    });

    const handleMouseToggle = (wordData: any) => {
      setData((prevData: any) => {
        const updatedUncertainWords = prevData.uncertain_words.map(
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
      const insertedTooltip = data.uncertain_words.map((wordData: any) => ({
        ...wordData,
        showTooltip: false,
      }));

      setData({
        ...data,
        uncertain_words: insertedTooltip,
      });
    };
    const highlightedText = () => {
      const words = data.transcript.toLowerCase().split(" ");
      return words.map((content: string, index: number) => {
        const matchUncertain = data.uncertain_words.find((wordData: any) => {
          const previous_words =
            index >= 2 ? words.slice(index - 2, index).join(" ") : "";
          return (
            wordData.word === content &&
            wordData.previous_words === previous_words
          );
        });

        return (
          <React.Fragment key={index}>
            <> </>
            <p
              className={`${matchUncertain && styles.uncertain}`}
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
              <span className={styles.word}>{content}</span>
              {matchUncertain && matchUncertain.showTooltip && (
                <span className={styles.tooltip}>
                  Começa em: {formatTime(matchUncertain.start_time)}, Termina
                  em: {formatTime(matchUncertain.end_time)}
                </span>
              )}
            </p>
          </React.Fragment>
        );
      });
    };

    useEffect(() => {
      updateUncertainWords();
    }, []);

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
