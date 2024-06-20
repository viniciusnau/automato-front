import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Joyride, { Step } from 'react-joyride';
import { FaPlayCircle } from 'react-icons/fa';
import tutorialStyles from './TutorialStyles';
import styles from './Tutorial.module.css';
import Button from '../Forms/Button';
// import audioFile from '../../Assets/test.mp3';
import videoFile from '../../Assets/file.mp4';

const Tutorial = () => {
    const [run, setRun] = useState(false);
    const navigate = useNavigate();

    const handleJoyrideCallback = (data: any) => {
        const { action, index, status } = data;

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
                        const file = new File([blob], 'file.mp4', {
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
        if (status === 'finished' || status === 'skipped') {
            setRun(false);
        }
    };

    const steps: Step[] = [
        {
            target: '#logo',
            content: 'Clique na logo para ir para a página inicial.',
        },
        {
            target: '#logout',
            content: 'Clique aqui para sair do seu login.',
        },
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
            content:
                'Você irá clicar aqui para fazer upload do seu arquivo de áudio. Formatos de arquivo suportados: MP3, MP4, WAV, FLAC, AMR, OGG.',
        },
        {
            target: '.slider',
            content:
                'Você irá clicar aqui regular o tempo inicial e final de duração da sua transcrição.',
        },
        {
            target: '#transcribe-button',
            content: 'Clique aqui para transcrever seu áudio.',
        },
        // {
        //     target: '#transcricoes',
        //     content: 'Clique aqui para ver suas transcrições.',
        // },
    ];

    const handleStartTutorial = () => {
        setRun(true);
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
                locale={{
                    back: 'Voltar',
                    close: 'Fechar',
                    last: 'Fim',
                    next: 'Próximo',
                    open: 'Abrir',
                    skip: 'Sair',
                }}
                styles={tutorialStyles}
                callback={handleJoyrideCallback}
            />
        </>
    );
};

export default Tutorial;
