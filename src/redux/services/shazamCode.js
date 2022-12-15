import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


  export const shazamCoreApi = createApi({
    reducerPath: "shazamCoreApi",
    baseQuery: fetchBaseQuery({
      baseUrl:"https://shazam-core.p.rapidapi.com/v1",
      prepareHeaders: (headers)=> {
        headers.set('X-RapidAPI-Key','ed6361071dmshce1cb7fb56c6f1dp10c4dejsnbf788e376a5b',)

        return headers
      }
    }),
    endpoints: (builders) => ({
      getTopCharts: builders.query({query: ()=> "/charts/world"})
    })
  });


  export const {
    useGetTopChartsQuery
  } = shazamCoreApi;