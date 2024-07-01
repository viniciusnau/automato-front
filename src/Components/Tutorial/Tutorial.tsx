import styles from "./Tutorial.module.css";
import Button from "../Forms/Button";
import { useEffect, useRef, useState } from "react";
import { useSetState } from 'react-use';
import {BsRocket } from "react-icons/bs";
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import {logGroup} from "../../modules/helpers";
import tutorialStyles from "./TutorialStyles";

interface Props {
  breakpoint: string;
}

interface State {
  run: boolean;
  steps: Step[];
}

export default function Tutorial(props: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isResponsive, setIsResponsive] = useState(false);
  const { breakpoint } = props;
  const [{ run, steps }, setState] = useSetState<State>({
    run: false,
    steps: [
      {
        content: <h2>Vamos iniciar sua jornada!</h2>,
        locale: { skip: <strong aria-label="skip">Cancelar</strong> },
        placement: 'center',
        target: 'body',
      },
      {
        content: <h2>Clique aqui para sair da sessão.</h2>,
        spotlightPadding: 20,
        target: 'logout',
      }
    ],
  });

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth >= 769);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false });
    }

    logGroup(type, data);
  };

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setState({
      run: true,
    });
  };

  return (
      <Button onClick={handleClickStart} className={`${styles.tutorial} ${styles.button}`}> <BsRocket size={32} color="black"/>
        <Joyride
            callback={handleJoyrideCallback}
            continuous
            run={run}
            scrollToFirstStep
            showProgress
            showSkipButton
            steps={steps}
            styles={tutorialStyles}
            locale={{
              back: 'Voltar',
              close: 'Fechar',
              last: 'Fim',
              next: 'Próximo',
              open: 'Clique aqui para começar o tutorial',
              skip: 'Sair',
            }}
        />
      </Button>
  );
};

