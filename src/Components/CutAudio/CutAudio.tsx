import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '@mui/material';
import { acceptedFormats } from '../Helper';
import AudioPlayer from 'react-h5-audio-player';
import styles from './CutAudio.module.css';
import 'react-h5-audio-player/lib/styles.css';
import {
    setAudioDuration,
    setSliderValues,
} from '../../Services/Slices/cutAudioSlice';

interface IPlayer {
    audioFile: any;
}

const PlayerCutAudio: React.FC<IPlayer> = ({ audioFile }) => {
    const audioPlayerRef = React.createRef<AudioPlayer>();
    const dispatch = useDispatch();
    const durationPlayer = useSelector(
        (state: any) => state.cutAudioSlice.duration
    );
    const sliderValues = useSelector(
        (state: any) => state.cutAudioSlice.sliderValues
    );

    const removeFileFormat = (fileName: any) => {
        let format = fileName;
        acceptedFormats.forEach((el: string) => {
            format = format?.replace('.' + el, '');
        });

        return format;
    };

    const handleSliderChange = (event: Event, newValues: number | number[]) => {
        dispatch(setSliderValues(newValues as number[]));
    };

    const formatTime = (seconds: number): string => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        if (hrs > 0) {
            return `${hrs.toString().padStart(2, '0')}:${mins
                .toString()
                .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            return `${mins.toString().padStart(2, '0')}:${secs
                .toString()
                .padStart(2, '0')}`;
        }
    };

    useEffect(() => {
        if (audioPlayerRef?.current?.audio.current && durationPlayer === 0) {
            const handleLoadedMetadata = () => {
                const audioDuration =
                    audioPlayerRef.current!.audio.current!.duration;
                if (!isNaN(audioDuration)) {
                    dispatch(setAudioDuration(audioDuration));
                    dispatch(setSliderValues([0, audioDuration]));
                }
            };

            const audioElement = audioPlayerRef.current.audio.current;
            audioElement.addEventListener(
                'loadedmetadata',
                handleLoadedMetadata
            );

            return () => {
                audioElement.removeEventListener(
                    'loadedmetadata',
                    handleLoadedMetadata
                );
            };
        }
    }, [audioPlayerRef, dispatch, durationPlayer]);

    useEffect(() => {
        dispatch(setAudioDuration(0));
    }, [audioFile, dispatch]);

    return (
        <div>
            <AudioPlayer
                ref={audioPlayerRef}
                className={styles.container}
                src={audioFile && URL.createObjectURL(audioFile)}
                header={removeFileFormat(audioFile?.name)}
                layout="stacked-reverse"
                autoPlayAfterSrcChange={true}
            />
            {audioFile && (
                <div className={styles.bar}>
                    <Slider
                        className={styles.slider}
                        value={sliderValues}
                        onChange={handleSliderChange}
                        aria-labelledby="range-slider"
                        color="success"
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => formatTime(value)}
                        min={0}
                        max={durationPlayer}
                    />
                </div>
            )}
        </div>
    );
};

export default PlayerCutAudio;
