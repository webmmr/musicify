import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        // "ed6361071dmshce1cb7fb56c6f1dp10c4dejsnbf788e376a5b"
        "28ac4325bemsh317a6a71e154495p17733ejsnd5786b129974"
      );

      return headers;
    },
  }),
  endpoints: (builders) => ({
    getTopCharts: builders.query({ query: () => "/charts/world" }),
    getSongDetails: builders.query({
      query: ({ songid }) => `/tracks/details?track_id=${songid}`,
    }),
    getSongRelated: builders.query({
      query: ({ songid }) => `/tracks/related?track_id=${songid}`,
    }),
    getArtistDetails: builders.query({
      query: (artistId) => `/artists/details?artist_id=${artistId}`,
    }),
    getSongsbyCountry: builders.query({
      query: (countryCode) => `/charts/country?country_code=${countryCode}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsbyCountryQuery,
} = shazamCoreApi;
