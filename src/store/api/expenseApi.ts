import { CreatedExpenseData, DeleteExpenseRequest, Expense, GetAllExpensesResponse, GetExpenseResponse, GetExpensesRequest } from "@/domain/entities/Expense";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const expenseApi = createApi({
    reducerPath: "expenseApi",
    baseQuery: (fetchBaseQuery({
        baseUrl: "http://localhost:4000/api",
        credentials: "include"
    })),
    tagTypes: ["Expenses", "Transactions"],
    endpoints: (builder) => ({
        createExpense: builder.mutation<Expense, CreatedExpenseData>({
            query: (body) => ({
                url: "/expense",
                method: "POST",
                body
            }),
            invalidatesTags: ["Expenses", "Transactions"]
        }),
        deleteExpense: builder.mutation<void, DeleteExpenseRequest>({
            query: (body) => ({
                url: "/expense",
                method: "DELETE",
                body
            }),
            invalidatesTags: ["Expenses", "Transactions"]
        }),
        getAllExpenses: builder.query<GetAllExpensesResponse, void>({
            query: () => ({
                url: "/expenses",
                method: "GET"
            }),
            providesTags: ["Expenses"]
        }),
        getExpenseByName: builder.query<GetExpenseResponse, GetExpensesRequest>({
            query: ({ description, page, limit}) => ({
                url: "/expenses",
                params: { description, page, limit}
            }),
            providesTags: ["Expenses"]
        })
    })
})

export const { useCreateExpenseMutation, useGetAllExpensesQuery, useGetExpenseByNameQuery } = expenseApi;