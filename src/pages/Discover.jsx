import { Error, SongCard, Loader } from "../components";
import { genres } from "../assets/constants";
import { useGetSongsbyGenreQuery } from "../redux/services/shazamCode";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  const { data, isFetching, error } = useGetSongsbyGenreQuery(
    genreListId || "POP"
  );

  if (isFetching) {
    <Loader title="Loading ..." />;
  }

  if (error) {
    <Error />;
  }

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mb-10">
        <h2 className="font-bold text-3xl text-orange-400 text-left">
          Discover {genreTitle || "Pop"}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "POP"}
          className="bg-[#161f33] text-gray-400 border border-gray-900 mr-6 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option value={genre.value} key={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            activeSong={activeSong}
            isPlaying={isPlaying}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
