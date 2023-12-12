import React, {useEffect, useState} from "react";
import styles from "./CutAudio.module.css";
import AudioPlayer from "react-h5-audio-player";
import { Slider } from "@mui/material";
import "react-h5-audio-player/lib/styles.css";
import { acceptedFormats } from "../Helper";

interface IPlayer {
    audioFile: any;
}

const PlayerCutAudio: React.FC<IPlayer> = ({ audioFile}) => {
  
    const [initialDuration, setInitialDuration] = useState<number | null>(null);
    const [endDuration, setEndDuration] = useState<number | null>(null);
    const [sliderValues, setSliderValues] = useState<number[]>([0, 0]);
    
    const handleSliderChange = (event: Event, newValues: number | number[]) => {
      setSliderValues(newValues as number[]);
    };

    const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
      const durationInSeconds = (e.target as HTMLAudioElement).duration;
      setInitialDuration(0);
      setEndDuration(durationInSeconds);
      setSliderValues([0, durationInSeconds]);
    };

    // const handleListen = (e: any) => {
    //   console.log('onListen event: ' ,e);
    //   console.log('current time: ' ,e.target.currentTime);
    // }

    const removeFileFormat = (fileName: any) => {
      let format = fileName; 
      acceptedFormats.forEach((el : string) => {
              format = format?.replace('.'+el, '');
      });
      
      return format;
  };

  useEffect(() => {
    setInitialDuration(null);
    setEndDuration(null);
    setSliderValues([0, 0]);
  }, [audioFile]);

  return (
    <div>
      <AudioPlayer
        className={styles.container}
        src={audioFile && URL.createObjectURL(audioFile)}
        header={removeFileFormat(audioFile?.name)}
        layout="stacked-reverse"
        // onLoadedMetaData={handleLoadedMetadata}
        defaultDuration={endDuration}
      />
      <div className={styles.bar}>
        <Slider
          value={sliderValues}
          onChange={handleSliderChange}
          aria-labelledby="range-slider"
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value.toFixed(2)}s`}
          min={initialDuration || 0}
          max={endDuration || 0}
          className={styles.slider}
        />
      </div>
    </div>
  ); 
};

export default PlayerCutAudio;