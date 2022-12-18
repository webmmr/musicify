import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

import defaultCoverArt from "../assets/defaultCoverArt.jpg";

const SongCard = ({ song, activeSong, isPlaying, data, i }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[240px] p-4 bg-[#111827] bg-opacity-80  backdrop-blur animate-slideup rounded-lg">
      <div className="relative w-full h-55 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            activeSong={activeSong}
            isPlaying={isPlaying}
          />
        </div>
        <img
          src={song.images ? song.images.coverart : defaultCoverArt}
          alt="CoverArt"
        />
      </div>
      <div className="flex mt-4 flex-col">
        <p className="text-lg font-semibold text-white truncate">
          <Link to={`/songs/${song.key}`}>{song.title}</Link>
        </p>
        <p className="text-gray-400 truncate mt-1 text-sm">
          {song?.subtitle}
          {/* <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link> */}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
