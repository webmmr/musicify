import {FaPauseCircle, FaPlayCircle} from "react-icons/fa" 

const PlayPause = ({song, handlePause, handlePlay, activeSong, isPlaying}) => 
(isPlaying && activeSong.title === song.title ? (<FaPauseCircle size={32} className="text-gray-100" onClick={handlePause}  />) : (<FaPlayCircle size={32} className="text-gray-100" onClick={handlePlay} />));

export default PlayPause;
