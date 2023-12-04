import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import styles from './AudioPlayer.module.css'
import 'react-h5-audio-player/lib/styles.css';

interface IPlayer {
    audioFile: any;
}

const Player: React.FC<IPlayer> = ({audioFile}) => {
    return (
        <div> 
        {audioFile && (
            <AudioPlayer className={styles.container} src={URL.createObjectURL(audioFile)} header={audioFile.name}  
            />
        )}
        </div>
    )
}

export default Player;