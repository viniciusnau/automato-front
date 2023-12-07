import React from 'react';
import styles from './AudioPlayer.module.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { acceptedFormats } from '../Helper';

interface IPlayer {
    audioFile: any;
}

const Player: React.FC<IPlayer> = ({ audioFile }) => {
    const removeFileFormat = (fileName: any) => {
      let format = fileName; 
      acceptedFormats.forEach((el : string) => {
              format = format.replace('.'+el, '');
      });
      
      return format;
  };
  

    return (
        <div>
            <AudioPlayer
                className={styles.container}
                src={URL.createObjectURL(audioFile)}
                header={removeFileFormat(audioFile.name)}
                layout="stacked-reverse"
            />
        </div>
    );
};

export default Player;