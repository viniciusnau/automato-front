import styles from "./Tutorial.module.css";
import Button from "../Forms/Button";
import { useEffect, useState } from "react";
import { useSetState } from 'react-use';
import { BsRocket } from "react-icons/bs";
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { logGroup } from "../../modules/helpers";
import tutorialStyles from "./TutorialStyles";
import {useLocation, useNavigate} from "react-router-dom";
import videoFile from "../../Assets/ArquivoExemplo.mp4"

interface Props {
  breakpoint: string;
}

interface State {
  run: boolean;
  steps: Step[];
}

export default function Tutorial(props: Props) {
    const navigate = useNavigate();
    const location = useLocation();
  const [isResponsive, setIsResponsive] = useState(false);
    const [{ run, steps }, setState] = useSetState<State>({
        run: false,
        steps: []
    }
    );

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
      const { action, index, status, type } = data;

      if (data.action === 'stop' && data.type === 'tour:status') {
          setState({ run: false });
      }
      const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

      if (finishedStatuses.includes(status)) {
          setState({ run: false });
      }

      if (location.pathname === "/automato/transcrever/" && index === 1 && action) {
          const fileInput = document.getElementById(
              'file'
          ) as HTMLInputElement;
          if (fileInput) {
              fetch(videoFile)
                  .then((res) => res.blob())
                  .then((blob) => {
                      const file = new File([blob], 'ArquivoExemplo.mp4', {
                          type: 'video/mp4',
                      });
                      const dataTransfer = new DataTransfer();
                      dataTransfer.items.add(file);
                      fileInput.files = dataTransfer.files;

                      const changeEvent = new Event('change', {
                          bubbles: true,
                      });
                      fileInput.dispatchEvent(changeEvent);
                  })
                  .catch((error) => {
                      console.error('Error:', error);
                  });
          }
      }

      if (location.pathname === "/automato/" && index === 3 && action) {
          navigate("/automato/exemplo-visualizacao/50/")
      }

      if (location.pathname === "/automato/exemplo-visualizacao/50/" && type === "error:target_not_found") {
          navigate("/automato/");
      }

      if (location.pathname === "/automato/exemplo-visualizacao/50/" && index === 6 && action) {
          navigate("/automato/");
      }

      logGroup(type, data);
  };

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
      if (location.pathname === "/automato/transcrever/") {
          event.preventDefault();
          setState({
              run: true,
              steps: [
                  {
                        title: "Aprendendo a transcrever!",
                        content: <h3>As próximas instruções têm como objetivo exemplificar o processo de transcrição.</h3>,
                        locale: { skip: <strong aria-label="skip">Cancelar</strong> },
                        placement: 'center',
                        target: 'body',
                        disableBeacon: true,
                      },
                      {
                        content: <h3>Faça o upload do arquivo a ser transcrito.</h3>,
                        spotlightPadding: 20,
                        target: '#upload',
                        disableBeacon: true,
                      },
                      {
                          title: "Atenção!",
                        content: <h3>Cada minuto de áudio transcrito gera custos, então certifique-se de transcrever apenas o que deseja.</h3>,
                          placement: 'center',
                        target: 'body',
                          disableBeacon: true,
                      },
                        {
                            content: <h3>Regule os minutos exatos a serem transcritos.</h3>,
                            spotlightPadding: 20,
                            target: '#slider',
                            disableBeacon: true,
                        },
                        {
                            content: <h3>Por fim, inicie a transcrição.</h3>,
                            spotlightPadding: 20,
                            target: '#transcribe-bttn',
                            disableBeacon: true,
                        },
                        {
                            title: "Atenção!",
                            content: <h3>Os formatos permitidos são: MP3, MP4, WAV, FLAC, AMR, OGG.</h3>,
                            placement: 'center',
                            target: 'body',
                            disableBeacon: true,
                        },
                        {
                            content: <h3>Enquanto sua transcrição estiver na fila de espera, você poderá vê-la aqui.</h3>,
                            target: '#table',
                            disableBeacon: true,
                        },
                        {
                            content: <h3>Depois de realizar o processo, você receberá um email assim que sua transcrição estiver pronta.</h3>,
                            placement: 'center',
                            target: 'body',
                            disableBeacon: true,
                        },
                        {
                            title: "Obrigado!",
                            content: <h3>Caso tenha mais dúvidas ou problemas, abra um chamado no SIT e selecione a categoria "Autômato".</h3>,
                            placement: 'center',
                            target: 'body',
                            disableBeacon: true,
                        },
              ]
          });
      }
      if (location.pathname === "/automato/") {
          event.preventDefault();
          setState({
              run: true,
              steps: [
                  {
                      title: "Visualizando as suas transcrições!",
                      content: <h3>As próximas instruções têm como objetivo detalhar o processo de análise sobre a transcrição.</h3>,
                      locale: { skip: <strong aria-label="skip">Cancelar</strong> },
                      placement: 'center',
                      target: 'body',
                      disableBeacon: true,
                  },
                  {
                      content: <h3>Clique aqui para excluir o áudio transcrito.</h3>,
                      target: '#delete',
                      disableBeacon: true,
                      spotlightPadding: 20,
                  },
                  {
                      content: <h3>Visualize o texto da transcrição.</h3>,
                      target: '#details',
                      disableBeacon: true,
                      spotlightPadding: 20,
                  },
                  {
                      title: "Perceba que algumas palavras estão coloridas, isso se deve ao índice de confiança que o Autômato possui em relação à transcrição da palavra.",
                      content: <h3>Amarelo representa um índice de confiança de 60% a 80%, laranja representa de 40% a 60% e vermelho de 10% a 30%.</h3>,
                      target: 'body',
                      disableBeacon: true,
                  },
                  {
                      content: <h3>Copie a transcrição completa!</h3>,
                      target: '#copy',
                      disableBeacon: true,
                  },
                  {
                      content: <h3>Nos ajude a melhorar o Autômato corrigindo o texto!</h3>,
                      target: '#edit',
                      disableBeacon: true,
                  },
                  {
                      title: "Obrigado!",
                      content: <h3>Caso tenha mais dúvidas ou problemas, abra um chamado no SIT e selecione a categoria "Autômato".</h3>,
                      placement: 'center',
                      target: 'body',
                      disableBeacon: true,
                  },
              ]
          });
      }
  };

  return (
      (location.pathname === "/automato/transcrever/" || location.pathname === "/automato/" || location.pathname === "/automato/exemplo-visualizacao/50/") && (
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
                  disableScrollParentFix={true}
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
      )
      || null
  );
};
