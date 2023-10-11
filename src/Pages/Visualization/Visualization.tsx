import styles from "./Visualization.module.css";
import Button from "../../Components/Forms/Button";
import { BiSolidFile, BiSolidShare, BiSolidEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import React from "react";

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
    const data = {
      transcript:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      uncertain_words: [
        {
          word: "elit,",
          previous_words: "consectetur adipiscing",
          confidence: 0.256,
          start_time: 1,
          end_time: 3,
        },
        {
          word: "dolor",
          previous_words: "lorem ipsum",
          confidence: 0.256,
          start_time: 1,
          end_time: 3,
        },
        {
          word: "dolor",
          previous_words: "aute irure",
          confidence: 0.256,
          start_time: 1,
          end_time: 3,
        },
      ],
    };

    const handleEditText = () => {};

    const handleCopyText = () => {
      navigator.clipboard.writeText(data.transcript);
    };

    function decimalToHexColor(percentage: number) {
      percentage = Math.min(100, Math.max(0, percentage));

      let red, green, blue;

      if (percentage <= 50) {
        red = 255;
        green = Math.round((percentage / 50) * 255);
        blue = 0;
      } else {
        red = Math.round(((100 - percentage) / 50) * 255);
        green = 255;
        blue = 0;
      }

      const redHex = red.toString(16).padStart(2, "0");
      const greenHex = green.toString(16).padStart(2, "0");
      const blueHex = blue.toString(16).padStart(2, "0");

      console.log(`#${redHex}${greenHex}${blueHex}`);
      return `#${redHex}${greenHex}${blueHex}`;
    }

    const highlightedText = () => {
      const words = data.transcript.toLowerCase().split(" ");
      const uncertainWords = data.uncertain_words;

      return words.map((content, index) => {
        const matchingUncertainWord = uncertainWords.find((wordData) => {
          const previous_words =
            index >= 2 ? words.slice(index - 2, index).join(" ") : "";
          // Adjust the quantity of previous words after integration
          return (
            wordData.word === content &&
            wordData.previous_words === previous_words
          );
        });
        return (
          <React.Fragment key={index}>
            <p> </p>
            <p className={`${matchingUncertainWord && styles.uncertain}`}>
              {content}
            </p>
          </React.Fragment>
        );
      });
    };

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
