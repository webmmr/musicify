import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

// import { useGetArtistDetailsQuery } from "../redux/services/shazamCode";

const ArtistDetails = () => {
  const { id: artistId } = useParams();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  // const {
  //   data: artistData,
  //   isFetching: isFetchingArtistDetails,
  //   error,
  // } = useGetArtistDetailsQuery(artistId);

  // if (isFetchingArtistDetails)
  //   return <Loader title="Loading artist details..." />;

  // if (error) return <Error />;

  // Api v2

  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://shazam-core.p.rapidapi.com/v2/artists/details",
      params: { artist_id: artistId },
      headers: {
        "X-RapidAPI-Key": "ed6361071dmshce1cb7fb56c6f1dp10c4dejsnbf788e376a5b",
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setFetchedData(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [fetchedData]);

  console.log(fetchedData);

  return (
    <div className="flex flex-col">
      {/* <DetailsHeader artistId={artistId} artistData={artistData} /> */}

      {/* <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      /> */}
    </div>
  );
};

export default ArtistDetails;
