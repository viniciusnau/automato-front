import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Joyride, { Step } from 'react-joyride';
import { ACTIONS, EVENTS, ORIGIN, STATUS, CallBackProps } from 'react-joyride';
import { FaPlayCircle } from 'react-icons/fa';
import tutorialStyles from './TutorialStyles';
import styles from './Tutorial.module.css';
import Button from '../Forms/Button';
import videoFile from '../../Assets/seu_audio.mp4';
import { setFakeData } from '../../Services/Slices/transcriptionsSlice';
import { setFakeDataWords } from '../../Services/Slices/transcriptSlice';
import { useDispatch, useSelector } from 'react-redux';

const Tutorial = () => {
    const [run, setRun] = useState(false);
    const navigate = useNavigate();
    const transcriptions = useSelector(
        (state: any) => state.transcriptionsSlice.data
    );
    const dispatch = useDispatch();
    const [stepIndex, setStepIndex] = useState(0);
    const { fakeDataWords } = useSelector(
    (state: any) => state.transcriptSlice.fakeDataWords
    );

    const handleJoyrideCallback = async (data: CallBackProps) => {
        const { action, index, status, type } = data;

        // if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
        //     setTimeout(() => {
        //         setStepIndex((prevIndex) => prevIndex + 1);
        //     }, 1000);
        // }

        const loremIpsum =
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

        console.log(`Action: ${action}, Index: ${index}, Status: ${status}`);

        if (index === 3 && action === 'next') {
            navigate('/automato/transcrever');
        }
        if (index === 4 && action === 'next') {
            const fileInput = document.getElementById(
                'file'
            ) as HTMLInputElement;
            if (fileInput) {
                fetch(videoFile)
                    .then((res) => res.blob())
                    .then((blob) => {
                        const file = new File([blob], 'seu_audio.mp4', {
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
                        console.error('Erro ao carregar arquivo MP4:', error);
                    });
            }
        }
        if (index === 7 && action === 'next') {
            navigate('/automato/');
            if (transcriptions.length === 0 || transcriptions.length !== 0) {
                const fakeData = [
                    {
                        name: 'seu_audio.mp4',
                        created_at: new Date().toLocaleDateString('pt-BR'),
                        code: '1',
                        id: 1,
                        details: 'details',
                        delete: 'delete',
                    },
                ];

                dispatch(setFakeData(fakeData));
            }
        }
        if (index === 9 && action === 'next') {
            navigate('/automato/visualizacao');
        }
        if (index === 11 && action === 'next') {
            // const editButton = document.getElementById('edit-button');
            // if (editButton) {
            //     editButton.click();
            // } else {
            //     console.error('Elemento #edit-button não encontrado.');
            // }
        }
        if (status === 'finished' || status === 'skipped') {
            setRun(false);
            dispatch(setFakeDataWords(false));
            dispatch(setFakeData(false));
            navigate('/automato/');
        }
    };

    const steps: Step[] = [
        {
            target: '#logo',
            content: 'Clique na logo para ir para a página inicial.',
        },
        { target: '#logout', content: 'Clique aqui para sair do seu login.' },
        {
            target: '#redefinir-senha',
            content: 'Clique aqui para redefinir sua senha.',
        },
        {
            target: '#transcrever',
            content: 'Clique aqui para realizar a transcrição do seu áudio.',
        },
        {
            target: '#upload-button',
            content: 'Clique aqui para fazer upload do seu arquivo de áudio.',
        },
        {
            target: '#slider',
            content:
                'Regule aqui o tempo inicial e final de duração da sua transcrição.',
        },
        {
            target: '#transcribe-button',
            content: 'Clique aqui para transcrever seu áudio.',
        },
        {
            target: '#transcricoes',
            content: 'Clique aqui para ver suas transcrições.',
        },
        {
            target: '#delete-transcribe',
            content: 'Clique aqui para deletar sua transcrição.',
        },
        {
            target: '#details',
            content: 'Clique aqui para ver os detalhes de sua transcrição.',
        }, //9
        {
            target: '#copy-button-div',
            content: 'Clique aqui para copiar sua transcrição.',
        },
        {
            target: '#edit-button-div',
            content: 'Clique aqui para editar sua transcrição.',
        },
        {
            target: '#yellow',
            content:
                'Palavras marcadas por amarelo representam um índice de confiança de 60% a 80%.',
        },
        {
            target: '#orange',
            content:
                'Palavras marcadas por laranja representam um índice de confiança de 40% a 60%.',
        },
        {
            target: '#red',
            content:
                'Palavras marcadas por vermelho representam um índice de confiança de 10% a 30%.',
        },
        {
            target: '#text',
            content:
                'As demais palavras sem cores representam um altíssimo nivel de confiança.',
        },
        {
            target: '#redefine-button',
            content: 'Clique aqui para editar sua transcrição.',
        },
        {
            target: '#back-button',
            content: 'Clique aqui para editar sua transcrição.',
        },
        {
            target: '#save-button',
            content: 'Clique aqui para copiar sua transcrição.',
        },
    ];

    const handleStartTutorial = () => {
        setRun(true);
        dispatch(setFakeDataWords(true));
    };

    useEffect(() => {
        const tutorialShown = localStorage.getItem('tutorialShown');
        if (!tutorialShown) {
            setRun(true);
            localStorage.setItem('tutorialShown', 'true');
        }
    }, []);

    return (
        <>
            <Button
                className={styles.startTutorialButton}
                onClick={handleStartTutorial}
            >
                <FaPlayCircle size={32} color="black" />
            </Button>
            <Joyride
                steps={steps}
                continuous={true}
                scrollToFirstStep={true}
                showProgress={true}
                showSkipButton={true}
                run={run}
                disableCloseOnEsc={true}
                disableOverlayClose={true}
                hideCloseButton={true}
                // getHelpers={StoreHelpers()}
                locale={{
                    back: 'Voltar',
                    close: 'Fechar',
                    last: 'Fim',
                    next: 'Próximo',
                    open: 'Clique aqui para começar o tutorial',
                    skip: 'Sair',
                }}
                styles={tutorialStyles}
                callback={handleJoyrideCallback}
            />
        </>
    );
};

export default Tutorial;
