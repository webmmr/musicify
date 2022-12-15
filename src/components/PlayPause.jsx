import {FaPauseCircle, FaPlayCircle} from "react-icons/fa" 

const PlayPause = ({song, handlePauseClick, handlePlayClick, activeSong, isPlaying}) => (isPlaying && activeSong.title === song.title ? (<FaPauseCircle size={32} className="text-gray-100" onClick={handlePauseClick}  />) : (<FaPlayCircle size={32} className="text-gray-100" onClick={handlePlayClick} />));

export default PlayPause;
