import React, { useState } from 'react';
import styles from './CutAudio.module.css';
import AudioPlayer from 'react-h5-audio-player';
import { Slider } from '@mui/material';
import 'react-h5-audio-player/lib/styles.css';
import { acceptedFormats } from '../Helper';

interface IPlayer {
    audioFile: any;
}

const PlayerCutAudio: React.FC<IPlayer> = ({ audioFile }) => {
    const audioPlayerRef = React.createRef<AudioPlayer>();
    const [startTime, setStartTime] = useState<number>(0);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [sliderValues, setSliderValues] = useState<number[] | any>([0, 0]);

    const removeFileFormat = (fileName: any) => {
        let format = fileName;
        acceptedFormats.forEach((el: string) => {
            format = format?.replace('.' + el, '');
        });

        return format;
    };

    const handleseeking = () => {
        console.log('onseekig');
        if (audioPlayerRef.current?.audio.current?.currentTime) {
            setStartTime(audioPlayerRef.current.audio.current.currentTime);
            setEndTime(audioPlayerRef.current.audio.current.duration);
            const currentTime =
                audioPlayerRef.current.audio.current.currentTime;
            setSliderValues([currentTime - startTime, endTime]);
        }
    };

    const handleSliderChange = (event: Event, newValues: number | number[]) => {
        setSliderValues(newValues as number[]);
    };

    // const handleListen = () => {
    //     // when current time by audio not slider initial
    //     if (audioPlayerRef.current && audioPlayerRef.current.audio.current) {
    //         const currentTime =
    //             audioPlayerRef.current.audio.current.currentTime;

    //         if (endTime === null) {
    //             setSliderValues([currentTime - startTime, currentTime]);
    //             setEndTime(audioPlayerRef.current.audio.current.duration);
    //         } else {
    //             setSliderValues([currentTime - startTime, endTime]);
    //         }
    //     }
    // };

    // function formatTime(seconds) {
    //     const minutes = Math.floor(seconds / 60);
    //     const remainingSeconds = seconds % 60;

    //     // Use padStart to ensure that minutes and seconds are always two digits
    //     const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

    //     return formattedTime;
    //   }

    // var startTimeformated = formatTime(startTime)
    // var endTimeformated = formatTime(endTime)
    const setAudioDuration = (seconds: any) => {
        if (audioPlayerRef.current?.audio.current) {
            audioPlayerRef.current.audio.current.currentTime = seconds;
        }
    };

    console.log(audioPlayerRef.current?.audio.current?.currentTime); // false
    console.log(`sliderValues: ${sliderValues}`);
    console.log(`startTime: ${startTime}, endTime: ${endTime}`);

    return (
        <div>
            <AudioPlayer
                ref={audioPlayerRef}
                className={styles.container}
                src={audioFile && URL.createObjectURL(audioFile)}
                header={removeFileFormat(audioFile?.name)}
                layout="stacked-reverse"
                autoPlayAfterSrcChange={true}
                // onLoadedMetaData={handleLoadedMetaData} //here problem
                onSeeking={handleseeking}
                // defaultCurrentTime={
                //     audioPlayerRef.current?.audio.current?.currentTime
                // }
                // defaultDuration={
                //     audioPlayerRef.current?.audio.current?.duration
                // }
                // onListen={(e) => {
                //     // Access the current playback time
                //     const currentTime = e.target?.currentTime;
                //     console.log('Current Time:', currentTime);
                //   }}
                // onPlay={}
            />
            {audioFile && (
                <div className={styles.bar}>
                    <Slider
                        className={styles.slider}
                        value={sliderValues}
                        onChange={handleSliderChange}
                        aria-labelledby="range-slider"
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value.toFixed(2)}s`}
                        min={0}
                        max={endTime ?? 0}
                    />
                </div>
            )}
        </div>
    );
};

export default PlayerCutAudio;
