import styles from "./Visualization.module.css";
import Button from "../../Components/Forms/Button";
import { useState } from "react";
import { BiSolidFile, BiSolidShare } from "react-icons/bi";
import { Navigate, useNavigate } from "react-router-dom";
// interface iVisualization {
//   data?: {
//     result: string;
//     uncertain_words: [{ word: string; minute: number; second: number }];
//   };
// }

const Visualization = () =>
  // { data }: iVisualization
  {
    const navigate = useNavigate();
    const data = {
      result:
        "Almir[0.009, 0.3, 0.451] Rogério Vaz[0.75, 1.049, 0.794] Boa tarde Boa tarde Então[3.289, 3.46, 0.699] Almiro[3.47, 3.779, 0.372] O senhor tá pretendendo do[4.869, 4.98, 0.567] Capi[4.989, 5.34, 0.653] aqui uma área que o senhor teria comprado de W[7.199, 7.38, 0.109] W[7.389, 7.73, 0.076] e[7.739, 8.05, 0.681] Rosane[8.06, 9.88, 0.542] PA[9.89, 10.72, 0.253] Ah[10.729, 10.739, 0.448] o senhor e a sua esposa na rua Prefeito Rolan[16.639, 16.68, 0.698] É isso né Uma área de quatrocentos e oitenta e dois pra vinte metros quadrados Isso isso[22.76, 23.569, 0.299] isso O senhor comprou isso eh[25.559, 25.569, 0.732] o primeiro O seu V[28.709, 28.77, 0.791] amor[28.78, 29.18, 0.611] e a dona Rosane são o que[30.239, 30.399, 0.486] seus pai E mãe pai e mãe isso O senhor tem outros irmãos Tem uma[36.36, 36.439, 0.784] irmã[36.45, 37.27, 0.674] casada solteira casada casada Seus pais tem[42.419, 42.61, 0.533] outros bens além desse que tá sendo Usa[45.139, 45.169, 0.531] o[45.18, 45.25, 0.638] capítulo[45.259, 45.68, 0.596] aqui não não não é o único bem E a irmã concorda que tivesse vendido isso aqui pro Senhor[53.86, 54.009, 0.745] naquela época hein[55.189, 55.709, 0.648] Qual o nome dela da minha irmã É[62.2, 62.88, 0.25] Thaisa[62.889, 63.61, 0.266] Fernanda Vete[64.449, 65.739, 0.028] E ela é casada logicamente E ela também concorda com isso hein[72.279, 72.3, 0.255] Ah aqui consta que o senhor teria comprado esse em dois mil e seis É isso isso foi um[80.41, 80.5, 0.679] contrato verbal é um contrato Não não Depois fizeram um contrato em dois mil e dez Mas dois mil e dez[88.15, 89.26, 0.024] foi de boca mesmo né Foi na época que o senhor resolveu fazer a casa ali do lado É[95.73, 96.54, 0.778] então[98.379, 98.55, 0.503] começou a construir a casa em dois mil e seis porque a planta é um pouco mais tarde né não a Casa Comecei a construir em dois mil e dez Ah então tá aqui A planta é dois mil e nove então o[107.68, 107.69, 0.607] senhor[107.699, 107.849, 0.723] fez aqui[108.04, 108.279, 0.297] em[108.29, 108.309, 0.322] dois mil e dez É[108.93, 109.059, 0.257] é isso é[109.879, 110.33, 0.792] o seu pai o senhor comprou ou o[112.919, 112.93, 0.39] seu pai Deu pro senhor Disse[113.839, 113.989, 0.501] ali não foi comprado comprado Pagou quanto lembra dez mil Acho que foi dez mil É[121.48, 122.209, 0.704] esse senhor comprou de Boca Por[124.29, 124.5, 0.782] que[124.51, 124.68, 0.623] que resolveram depois fazer o contrato lá em dois mil e dez que[129.419, 129.509, 0.691] daí[129.52, 129.55, 0.716] eu queria começar a construir Daí eu fiquei com com medo né Eu[132.24, 132.309, 0.742] queria fazer um contrato pra ter uma garantia né Tá e[139.399, 140.57, 0.344] o[140.58, 141.85, 0.758] senhor também precisou[142.229, 142.57, 0.788] juntar esse contrato com[143.539, 143.57, 0.326] o[143.58, 143.619, 0.649] município pra[144.1, 144.21, 0.637] aprovar a construção E eu fiz a planta depois da casa mas não foi no[149.729, 150.71, 0.629] não a planta o[151.33, 151.38, 0.788] senhor fez antes E[152.169, 152.179, 0.395] a planta que o senhor juntou aqui é anterior",
    };

    const handleCopyClick = () => {
      navigator.clipboard.writeText(data.result);
    };

    const renderHighlightedText = () => {
      const words = data.result.toLowerCase().split(/\s+/); // Split the text into words
      const regex = /\[\d+(\.\d+)(,\s*\d+(\.\d+))*\]/;
      return words.map((content, index) => {
        const isUncertain = regex.test(content);
        console.log("isUncertain:", isUncertain);
        if (isUncertain) {
          return (
            <span key={index} className={styles.uncertain}>
              {content}
            </span>
          );
        } else {
          return <span key={index}>{content + " "}</span>;
        }
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
            <Button className={styles.copy} onClick={handleCopyClick}>
              <BiSolidFile size={20} />
            </Button>
          </div>
          <div className={styles.text}>{renderHighlightedText()}</div>
        </div>
      </div>
    );
  };

export default Visualization;
