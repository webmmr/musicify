import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { Link } from "react-router-dom";

import { useGetSongDetailsQuery } from "../redux/services/shazamCode";
import { useGetSongRelatedQuery } from "../redux/services/shazamCode";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });
  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ songid });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs)
    return <Loader title="Fetching Song Details..." />;

  if (error) return <Error />;

  return (
    <>
      <div className="flex mt-10">
        <div className="mb-10 flex-1">
          <h2 className="text-white text-3xl font-bold">Lyrics</h2>
          <div className="mt-5">
            {songData?.sections[1].type === "LYRICS" ? (
              songData?.sections[1].text.map((line, i) => (
                <p className="text-gray-300 text-base my-2" key={i}>
                  {line}
                </p>
              ))
            ) : (
              <p>Sorry, no lyrincs found!</p>
            )}
          </div>
        </div>
        <div>
          <DetailsHeader artistId="" songData={songData} />
        </div>
      </div>
      <div>
        <RelatedSongs
          data={data}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      </div>
    </>
  );
};

export default SongDetails;
