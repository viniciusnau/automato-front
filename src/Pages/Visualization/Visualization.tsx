import styles from "./Visualization.module.css";
import Button from "../../Components/Forms/Button";

interface iVisualization {
  data?: {
    result: string;
    uncertain_words: [{ word: string; minute: number; second: number }];
  };
}

const Visualization = () =>
  // { data }: iVisualization
  {
    const renderHighlightedText = () => {
      const { result, uncertain_words } = {
        result: "isso é um texto",
        uncertain_words: [{ word: "isso", minute: 1, second: 3 }],
      };

      const words = result.split(" ");

      return words.map((word, index) => {
        const isUncertain = uncertain_words.some(
          (uncertainWord) => uncertainWord.word === word
        );

        if (isUncertain) {
          return (
            <>
              <span key={index} className={styles.uncertain}>
                {word}
              </span>
              <a> </a>
            </>
          );
        } else {
          return <span key={index}>{word + " "}</span>;
        }
      });
    };

    return (
      <div className={styles.container}>
        <div className={styles.modal}>
          <Button className={styles.button}>Return</Button>
        </div>
        <div className={styles.text}>{renderHighlightedText()}</div>
      </div>
    );
  };

export default Visualization;
