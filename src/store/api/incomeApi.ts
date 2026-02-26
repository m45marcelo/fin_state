import type { CreatedIncomeData, GetAllIncomesResponse, GetIncomeResponse, GetIncomesRequest, Income } from "@/domain/entities/Income";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const incomeApi = createApi({
    reducerPath: "incomeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/api",
        credentials: "include",
    }),
    tagTypes: ["Incomes"],
    endpoints: (builder) => ({
        createIncome: builder.mutation<Income, CreatedIncomeData>({
            query: (body) => ({
                url: "/income",
                method: "POST",
                body
            }),
            invalidatesTags: ["Incomes"]
        }),
        getAllIncomes: builder.query<GetAllIncomesResponse, void>({
            query: () => ({
                url: "/incomes",
                method: "GET"
            }),
            providesTags: ["Incomes"]
        }),
        getIncomeByName: builder.query<GetIncomeResponse, GetIncomesRequest>({
            query: ({ description, page, limit}) => ({
                url: "/incomes",
                params: {description, page, limit}
            }),
            providesTags: ["Incomes"]
        })
    }),
});

export const { useCreateIncomeMutation, useGetAllIncomesQuery, useGetIncomeByNameQuery } = incomeApi;