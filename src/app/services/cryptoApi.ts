import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CoinsExchangeInput, CoinsInput } from '../../entities/Coins';

const cryptoApiHeader = {
    'x-rapidapi-key': import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY,
    'x-rapidapi-host': import.meta.env.VITE_REACT_APP_CRYPTO_RAPIDAPI_HOST,
};


const createRequest = (url: any, params?: any) => ({ url, headers: cryptoApiHeader, params })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_REACT_APP_CRYPTO_API_URL }),
    endpoints: (builder) => ({
        getCrypto: builder.query({
            query: (count) => createRequest(`/coins`, { limit: count } as CoinsInput),
        }),
        getExchanges: builder.query({
            query: ( params: CoinsExchangeInput) => createRequest(`/coin/${params.uuid}/exchanges`, params),
        }),
        getCryptoDetails: builder.query({
            query: (uuid) => createRequest(`/coin/${uuid}`),
        }),
        getCryptoHistory: builder.query({
            query: ({ uuid, timeperiod }) => createRequest(`coin/${uuid}/history?timePeriod=${timeperiod}`),
        }),
    })
})

export const { useGetCryptoQuery, useGetCryptoDetailsQuery, useGetExchangesQuery, useGetCryptoHistoryQuery } = cryptoApi;