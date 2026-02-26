import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DeleteExpenseRequest } from "@/domain/entities/Expense";
import type {
	CreatedSubscriptionData,
	GetAllSubscriptionResponse,
	Subscription,
	UpdatedSubscriptionData,
} from "@/domain/entities/Subscription";

export const subscriptionApi = createApi({
	reducerPath: "subscriptionApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:4000/api",
		credentials: "include",
	}),
	tagTypes: ["Subscriptions"],
	endpoints: (builder) => ({
		createSubscription: builder.mutation<Subscription, CreatedSubscriptionData>(
			{
				query: (body) => ({
					url: "/subscription",
					method: "POST",
					body,
				}),
				invalidatesTags: ["Subscriptions"],
			},
		),
		deleteSubscription: builder.mutation<void, DeleteExpenseRequest>({
			query: (body) => ({
				url: "/expense",
				method: "DELETE",
				body,
			}),
			invalidatesTags: ["Subscriptions"],
		}),
		updateSubscription: builder.mutation<Subscription, UpdatedSubscriptionData>(
			{
				query: (body) => ({
					url: "/subscription",
					method: "PATCH",
					body,
				}),
				invalidatesTags: ["Subscriptions"],
			},
		),
		getAllSubscriptions: builder.query<GetAllSubscriptionResponse, void>({
			query: () => ({
				url: "/subscriptions",
				method: "GET",
			}),
			providesTags: ["Subscriptions"],
		}),
	}),
});

export const {
	useCreateSubscriptionMutation,
	useUpdateSubscriptionMutation,
	useGetAllSubscriptionsQuery,
	useDeleteSubscriptionMutation,
} = subscriptionApi;
