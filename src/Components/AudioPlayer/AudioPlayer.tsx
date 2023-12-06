// import React from "react";
// import styles from "./AudioPlayer.module.css";
// import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
// import { acceptedFormats } from "../Helper";

// interface IPlayer {
//   audioFile: any;
// }

// const Player: React.FC<IPlayer> = ({ audioFile }) => {

//   const removeFilesWithInvalidFormat = (audioFile:string) => {
//     const filteredFiles = files.filter((file) => {
//       const fileExtension = file.name.split(".").pop();
//       return acceptedFormats.includes(fileExtension.toLowerCase());
//     });
//     return filteredFiles;
//   };

//   return (
//     <div>
//       <AudioPlayer
//         className={styles.container}
//         src={URL.createObjectURL(audioFile)}
//         header={removeFilesWithInvalidFormat(audioFile.name)}
//       />
//     </div>
//   );
// };

// export default Player;

import React from "react";
import styles from "./AudioPlayer.module.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { acceptedFormats } from "../Helper";

interface IPlayer {
  audioFile: any;
}

const Player: React.FC<IPlayer> = ({ audioFile }) => {
  const removeFileFormat = (fileName: string) => {
    return fileName.split(".")[0];
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
