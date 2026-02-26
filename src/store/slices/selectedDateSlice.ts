import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SelectedDateState {
    date: string[] | undefined;
}

const initialState: SelectedDateState = {
    date: undefined
}

const selectedDateSlice = createSlice({
    name: "selectedDate",
    initialState,
    reducers: {
        selectedDate: (state, action: PayloadAction<string[]>)=> {
            state.date = action.payload;
        }
    }
})

export const selectedDateReducer = selectedDateSlice.reducer;
export const { selectedDate } = selectedDateSlice.actions;