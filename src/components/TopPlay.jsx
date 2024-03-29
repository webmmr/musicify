import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";

import defaultCoverArt from "../assets/defaultCoverArt.jpg";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCode";

const TopPlaysChart = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="flex flex-row w-full items-center py-2 p-4 rounded-lg cursor-pointer mb-2 hover:bg-[#4c2426e]">
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        src={song.images ? song.images.coverart : defaultCoverArt}
        alt={song?.title}
        className="w-[80px] h-[80px] rounded-lg"
      />
      <div className="flex flex-1 flex-col justify-center mx-3">
        <Link to={`/songs/${song?.key}`}>
          <p className="text-xl font-bold text-white">{song?.title}</p>
        </Link>
        {/* <Link to={`artists/${song?.artists[0]?.adamid}`}> */}
        <p className="text-gray-400 text-base mt-1 ">{song?.subtitle}</p>
        {/* </Link> */}
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      className=" xl:mb-0 mb-6 flex-1 xl:max-w-[450px] max-w-full flex flex-col"
      ref={divRef}
    >
      {/* Top Song Charts */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-orange-400 text-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-base text-gray-300 cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopPlaysChart
              song={song}
              i={i}
              key={song.key}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      {/* Top Artists */}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-orange-400 text-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-base text-gray-300 cursor-pointer">See more</p>
          </Link>
        </div>
      </div>

      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className="mt-4"
      >
        {topPlays?.map((song, i) => (
          <SwiperSlide
            key={song?.key}
            style={{ width: "17%", height: "auto" }}
            className="shadow-lg rounded-full animate-slideright"
          >
            {/* <Link to={`/artists/${song?.artists[0]?.adamid}`}> */}
            <img
              src={song?.images?.background}
              alt="name"
              className="rounded-full w-full object-cover"
            />
            {/* </Link> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopPlay;
