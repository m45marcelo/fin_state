import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	AuthenticateUserRequest,
	AuthenticateUserResponse,
	CreatedUserData,
	User,
} from "@/domain/entities/User";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:4000/api",
		credentials: "include",
	}),
	endpoints: (builder) => ({
		createUser: builder.mutation<User, CreatedUserData>({
			query: (body) => ({
				url: "/signup",
				method: "POST",
				body,
			}),
		}),
		authUser: builder.mutation<AuthenticateUserResponse, AuthenticateUserRequest>({
			query: (body) => ({
				url: "/login",
				method: "POST",
				body,
			}),
		}),
		getMe: builder.query<AuthenticateUserResponse, void>({
			query: () => ({
				url: "/me",
				method: "GET",
			}),
		}),
	}),
});

export const { useCreateUserMutation, useAuthUserMutation, useGetMeQuery } = userApi;
