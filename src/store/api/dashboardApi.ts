import { GetCategorySummaryRequest, GetCategorySummaryResponse } from "@/domain/entities/Dashboard";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/api",
        credentials: "include"
    }),
    tagTypes: ["Expenses", "Incomes"],
    endpoints: (builder) => ({
        getDashboard: builder.query<GetCategorySummaryResponse, void>({
            query: () => ({
                url: "/dashboard/categories",
            }),
            providesTags: ["Expenses", "Incomes"]
        })
    })
})

export const { useGetDashboardQuery } = dashboardApi