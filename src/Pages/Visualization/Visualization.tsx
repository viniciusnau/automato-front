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
        "Almir. Rogério Vaz Boa tarde, Boa tarde. Então? Almiro O senhor tá pretendendo do Capi aqui uma área que o senhor teria comprado de W W e Rosane PA? Ah, o senhor e a sua esposa na rua? Prefeito, Rolan É isso, né? Uma área de quatrocentos e oitenta e dois pra vinte metros quadrados. Isso isso isso. O senhor comprou isso, eh o primeiro. O seu V amor e a dona Rosane são o que seus pai? E mãe, pai e mãe isso. O senhor tem outros irmãos. Tem uma irmã casada, solteira, casada, casada, Seus pais tem outros bens além desse que tá sendo, Usa o capítulo aqui não, não, não é o único bem E a irmã concorda que tivesse vendido isso aqui, pro Senhor naquela época, hein. Qual o nome dela da minha irmã? É Thaisa? Fernanda Vete. E ela é casada logicamente. E ela também concorda com isso, hein? Ah, aqui consta que o senhor teria comprado esse em dois mil e seis. É isso isso foi um contrato verbal, é um contrato, Não, não. Depois, fizeram um contrato em dois mil e dez, Mas dois mil e dez foi de boca mesmo, né? Foi na época que o senhor resolveu fazer a casa ali do lado? É então começou a construir a casa em dois mil e seis, porque a planta é um pouco mais tarde, né, não a Casa! Comecei a construir em dois mil e dez. Ah, então, tá aqui. A planta é dois mil e nove, então o senhor fez aqui em dois mil e dez. É é isso, é o seu pai, o senhor comprou, ou o seu pai? Deu pro senhor. Disse ali não foi comprado comprado? Pagou, quanto lembra dez mil? Acho que foi dez mil. É esse senhor comprou de Boca. Por que que resolveram depois fazer o contrato lá em dois mil e dez, que daí eu queria começar a construir? Daí eu fiquei com com medo, né? Eu queria fazer um contrato pra ter uma garantia, né? Tá, e o senhor também precisou juntar esse contrato com o município pra aprovar a construção. E eu fiz a planta depois da casa, mas não foi no não a planta o senhor fez antes. E a planta que o senhor juntou aqui é anterior. Eu, se não me engano, aqui, a planta que o senhor juntou, deixa eu dar uma olhada aqui tava olhando hoje de manhã A planta é de fevereiro de dois mil e nove aqui esse contrato aqui é de outubro de dois mil e dez, então teve que juntar esse contrato lá no município também pra sim, por questão de ligar a energia também? Ah, sim, Então tá, e como não dava duas escrituras no no mesmo chão, daí tinha que ter um contrato pra poder ligar a energia também, e não dava pra desmembrar isso. Eu até tentei, mas aí de encaminhamento na prefeitura, só que daí não não foi encontrado o vizinho do da esquerda, né não, não foi encontrado ele pra, Foi o que eles me passaram na prefeitura, que eu não consegui o de desmembramento? Foi feito, o desmembramento porque não deu pra fazer desmembramento da prefeitura porque um dos vizinhos estava no local. Incerto é isso eh ninguém, não, não tem conhecimento desse senhor dele. Ele anda. Não é do José Virgílio e da dona Nelsa. É isso isso. Ah, então, tá. Por que que a sua irmã não assinou junto? Nesse contrato, ela era de menor? Até é, era de menor. Ah, na época eu era menor isso agora. A maior tá casada, né? Daí hein, Tá, então tá bom, O senhor construiu a casa lá em dois mil e dez. É isso isso desde então, Ali é a área urbana também, né. Área urbana Então tá? Ah, pelo que eu vi fotos ali da casa da sua casa. É aquela amarela que tá as fotos, É isso isso. Tá tudo cercado ali, tudo cercado com o seu pai, ele tem um muro, né? A sua é amarela e deixa eu ver. Se tem aqui, não dá bem pra ver a o seu pai é aquela acho que é branca, que tá do lado esquerdo ali de quem olha a rua é isso, né Isso então tá bom, como os vizinhos não tem com o seu pai, não tem crença com os vizinhos também. Não. Naquele outro lote vago ali, que tem duas Palmeiras ali não, esse aí que é desse pessoal que tá em isso, Esse do seu. O Virgílio que a gente não, não tem conhecimento dele e isso não tem voo nenhum. Então com ele e dos fundos é com quem ali os fundos, É com o Rio, Daí passa Ribeirão, mas tá, então Tá bom, Ah, Doutor! André Tem alguma pergunta Sim, Ciência! Eh o senhor conhece, chegou a conhecer esse seu José Virgílio e a do Denilson, na não. A ali no no terreno não mora ninguém no terreno deles? Não, não tem nada. Até quem mantém limpo é o meu pai. Mas não, não tem ninguém, nunca vi essa gente. Nem meu pai não conhece eles e, antes de do terreno do seu pai, eh dele com ele, comprou de quem O senhor lembra, sabe Ah, ele comprou do vizinho que mora do lado de cima dele. Não sabe se esse terreno de vocês um dia pertenceu ao seu José Virgílio Ah, não tenho esse conhecimento, não certo. Sem mais é na verda. Na verdade, a matrícula tem. Ele pertenceu antigamente a José Virgílio, que vendeu no domingo sábio Martins, e daí vendeu pro seu Valmor Isso Mas gosto, Não. Obrigado, Não estou me ouvindo Ministério Público, Alguma pergunta Quem há algum documento nos autos comprovando a concordância da irmã com a ação do Quer. Que eu saiba? Não, né? Toca, juntou algum documento da irmã, não amor. Não, não há nenhum documento nesse sentido, doutor, porque é que ela não foi chamada a hoje Eu tô é, eu tava perguntando pro pro autor, o senhor sabe que que a sua irmã não veio no processo? Não não, sem problema. E uma última pergunta si, exatamente se seria um três registro de morte. E ele teria alegado na prefeitura que disseram pro Senhor que não podia fazer o parcelamento ali porque o vizinho não tava pra concordar. Isso não foi encontrado, ele não. Mas na prefeitura disseram que daí não era possível. O parcelamento é daí, não conseguiam fazer, não foi dado em encaminhamento, daí pra frente, daí tem mais. Então tá nada mais.",
    };

    const handleCopyClick = () => {
      navigator.clipboard.writeText(data.result);
    };

    const renderHighlightedText = () => {
      const { uncertain_words } = {
        uncertain_words: [
          { word: "rogério", minute: 1, second: 3 },
          { word: "vaz", minute: 1, second: 3 },
          { word: "boa", minute: 1, second: 3 },
        ],
      };

      const words = data.result.toLowerCase().split(" ");
      const uncertainWordsArray = uncertain_words.map(
        (content) => content.word
      );

      return words.map((content, index) => {
        const isUncertain = uncertainWordsArray.includes(content);

        if (isUncertain) {
          uncertainWordsArray.splice(uncertainWordsArray.indexOf(content), 1);
          return (
            <>
              <p key={index} className={styles.uncertain}>
                {content}
              </p>
              <p> </p>
            </>
          );
        } else {
          return <p key={index}>{content + " "}</p>;
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
