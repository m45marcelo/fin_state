import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	AuthenticateUserRequest,
	AuthenticateUserResponse,
	CreatedUserRequest,
	UpdateUserRequest,
	UpdateUserResponse,
	User,
} from "@/domain/entities/User";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:4000/api",
		credentials: "include",
	}),
	tagTypes: ["User"],
	endpoints: (builder) => ({
		createUser: builder.mutation<User, CreatedUserRequest>({
			query: (body) => ({
				url: "/signup",
				method: "POST",
				body,
			}),
			invalidatesTags: ["User"]
		}),
		authUser: builder.mutation<AuthenticateUserResponse, AuthenticateUserRequest>({
			query: (body) => ({
				url: "/login",
				method: "POST",
				body,
			}),
		}),
		logoutUser: builder.mutation<{ message: string }, void>({
			query: () => ({
				url: "/logout",
				method: "POST",
			}),
			invalidatesTags: ["User"],
		}),
		updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
			query: (body) => ({
				url: "/me",
				method: "PATCH",
				body,
			}),
			invalidatesTags:["User"]
		}),
		updateAvatar: builder.mutation<{ message: string; avatarUrl: string }, FormData>({
			query: (formData) => ({
				url: "/profile/avatar",
				method: "PATCH",
				body: formData,
			}),
			invalidatesTags: ["User"],
		}),
		getMe: builder.query<AuthenticateUserResponse, void>({
			query: () => ({
				url: "/me",
				method: "GET",
			}),
			providesTags: ["User"],
		}),
	}),
});

export const { useCreateUserMutation, useAuthUserMutation, useGetMeQuery, useUpdateUserMutation, useLogoutUserMutation, useUpdateAvatarMutation } = userApi;
