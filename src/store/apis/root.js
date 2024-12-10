import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({baseUrl: import.meta.env.VITE_API});

export const rootapi = createApi({
reducerPath: "app",
    baseQuery,
    endpoints: (build)=> ({})
})


export const commonQueryConfig = {
    method: 'POST',
    cache: 'no-cache',
    redirect: 'follow',
};
