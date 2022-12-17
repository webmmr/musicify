import { Link } from "react-router-dom";

const DetailsHeader = ({ artistid, artistData, songData }) => {
  const artist = artistData?.artists[artistid]?.attributes;

  return (
    <div className="flex  w-full p-4 bg-white/5 bg-opacity-80 backdrop-blur rounded-lg">
      <div className="inset-0 flex flex-col items-center">
        <img
          src={
            artistid
              ? artist?.artwork?.url.replace("{w}", "500").replace("{h}", "500")
              : songData?.images?.coverart
          }
          alt="Art"
          className="object-cover rounded-lg w-[250px] h-[250px] shadow-lg shadow-black"
        />
        <div className="flex mt-4 flex-col w-full">
          <p className="text-3xl font-semibold text-white truncate">
            {artistid ? artist?.name : songData?.title}
          </p>
          {!artistid && (
            <Link to={`artists/${songData?.artists[0]?.adamid}`}>
              <p className="text-gray-300 truncate mt-1 text-sm">
                {songData?.subtitle}
              </p>
            </Link>
          )}
          <p className="text-gray-300  mt-1 text-sm">
            <span className="text-bold mr-1">Genre: </span>{" "}
            {artistid ? artist?.genreNames[0] : songData?.genres?.primary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
