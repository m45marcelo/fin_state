import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Subscription } from "@/domain/entities/Subscription";
import { Transaction } from "@/domain/entities/Transaction";

interface SelectedTransactionState {
	transaction: Transaction | Subscription | null;
}

const initialState: SelectedTransactionState = {
	transaction: null,
};

export const selectedTransactionSlice = createSlice({
	name: "selectedTransaction",
	initialState,
	reducers: {
		setSelectedTransaction: (state, action: PayloadAction<Transaction | Subscription>) => {
			state.transaction = action.payload;
		},
		clearSelectedTransaction: (state) => {
			state.transaction = null;
		},
	},
});

export const selectedTransactionReducer = selectedTransactionSlice.reducer;
export const { setSelectedTransaction, clearSelectedTransaction } =
	selectedTransactionSlice.actions;
