import styles from "./Visualization.module.css";
import Button from "../../Components/Forms/Button";

// interface iVisualization {
//   data?: {
//     result: string;
//     uncertain_words: [{ word: string; minute: number; second: number }];
//   };
// }

const Visualization = () =>
  // { data }: iVisualization
  {
    const renderHighlightedText = () => {
      const { result, uncertain_words } = {
        result:
          "isso é um texto isso é um texto isso é um texto isso é um texto isso é um textoisso é um texto isso é um texto isso é um texto isso é um texto isso é um textoisso é um texto isso é um texto isso é um texto isso é um texto isso é um texto",
        uncertain_words: [{ word: "isso", minute: 1, second: 3 }],
      };

      const words = result.split(" ");

      const uncertainWordsSet = new Set(
        uncertain_words.map((word) => word.word)
      );

      return words.map((word, index) => {
        const isUncertain = uncertainWordsSet.has(word);

        if (isUncertain) {
          uncertainWordsSet.delete(word);
          return (
            <p key={index} className={styles.uncertain}>
              {word + " "}
            </p>
          );
        } else {
          return <p key={index}>{word + " "}</p>;
        }
      });
    };

    return (
      <div className={styles.container}>
        <div className={styles.modal}>
          <Button className={styles.button}>Return</Button>
        </div>
        <div className={styles.textContainer}>
          <div className={styles.text}>{renderHighlightedText()}</div>
        </div>
      </div>
    );
  };

export default Visualization;
