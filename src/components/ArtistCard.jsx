import { useNavigate } from "react-router-dom";
// import axios from "axios";
import defaultCoverArt from "../assets/defaultCoverArt.jpg";

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  // axios
  //   .get(
  //     `https://shazam-core.p.rapidapi.com/v2/artists/details/artists/${track?.artists[0]?.adamid}`
  //   )
  //   .then((res) => console.log(res?.data));

  return (
    <div
      className="flex felx-col w-[250px] p-4 bg-white/5 bg-opacity-80 background-blur-sm cursor-pointer"
      onClick={() => navigate(`/artists/${track?.artists[0]?.adamid}`)}
    >
      <img
        src={track.images ? track.images.coverart : defaultCoverArt}
        alt="CoverArt"
        className="w-full h-56 rounded-lg"
      />
      <p className="text-white truncate mt-4 font-smibold text-lg">
        {track?.subtitle}
      </p>
    </div>
  );
};

export default ArtistCard;
