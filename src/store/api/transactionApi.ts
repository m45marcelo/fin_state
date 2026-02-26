import { GetTransactionsRequest, GetTransactionsResponse } from "@/domain/entities/Transaction";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionApi = createApi({
    reducerPath: "transactionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/api",
        credentials: "include"
    }),
    tagTypes: ["Transactions"],
    endpoints: (builder) => ({
        getAllTransactions: builder.query<GetTransactionsResponse, GetTransactionsRequest>({
            query: ({page, limit}) => ({
                url: "/transactions",
                params: { page, limit }
            })
        }),
        getAllTransactionByDate: builder.query<GetTransactionsResponse, GetTransactionsRequest>({
            query: ({startDate, endDate, page, limit}) => ({
                url: "/transactions",
            params: { startDate, endDate, page, limit }
            })
        }),
        getAllTransactionsByType: builder.query<GetTransactionsResponse, GetTransactionsRequest>({
            query: ({type, page, limit}) => ({
                url: "/transactions",
                params: { type, page, limit }
            }),
            providesTags: ["Transactions"]
        }),
        getTransactionByName: builder.query<GetTransactionsResponse, GetTransactionsRequest>({
            query: ({description, page, limit}) => ({
                url: "/transactions",
                params: { description, page, limit }
            })
        }),
        getAllTransactionsByTypeAndDate: builder.query<GetTransactionsResponse, GetTransactionsRequest>({
            query: ({type, startDate, endDate, page, limit}) => ({
                url: "/transactions",
                params: { type, startDate, endDate, page, limit }
            })
        })
    })
})

export const { useGetAllTransactionsQuery, useGetAllTransactionByDateQuery, useGetAllTransactionsByTypeAndDateQuery, useGetAllTransactionsByTypeQuery, useGetTransactionByNameQuery } = transactionApi;