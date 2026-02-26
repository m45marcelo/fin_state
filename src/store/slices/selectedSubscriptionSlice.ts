import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Subscription } from "@/domain/entities/Subscription";

interface SelectedSubscriptionState {
	subscription: Subscription | null;
}

const initialState: SelectedSubscriptionState = {
	subscription: null,
};

export const selectedSubscriptionSlice = createSlice({
	name: "selectedSubscription",
	initialState,
	reducers: {
		setSelectedSubscription: (state, action: PayloadAction<Subscription>) => {
			state.subscription = action.payload;
		},
		clearSelectedSubscription: (state) => {
			state.subscription = null;
		},
	},
});

export const selectedSubscriptionReducer = selectedSubscriptionSlice.reducer;
export const { setSelectedSubscription, clearSelectedSubscription } =
	selectedSubscriptionSlice.actions;
