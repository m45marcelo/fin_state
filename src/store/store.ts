import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./slices/modalSlice";
import { selectedSubscriptionReducer } from "./slices/selectedSubscriptionSlice";
import { transactionApi } from "./api/transactionApi";
import { incomeApi } from "./api/incomeApi";
import { expenseApi } from "./api/expenseApi";
import { subscriptionApi } from "./api/subscriptionApi";
import { userApi } from "./api/userApi";
import { dashboardApi } from "./api/dashboardApi";
import { selectedDateReducer } from "./slices/selectedDateSlice";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        selectedSubscription: selectedSubscriptionReducer,
        selectedDate: selectedDateReducer,
        [userApi.reducerPath] : userApi.reducer,
        [transactionApi.reducerPath] : transactionApi.reducer,
        [incomeApi.reducerPath] : incomeApi.reducer,
        [expenseApi.reducerPath] : expenseApi.reducer,
        [subscriptionApi.reducerPath] : subscriptionApi.reducer,
        [dashboardApi.reducerPath] : dashboardApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(transactionApi.middleware)
            .concat(incomeApi.middleware)
            .concat(expenseApi.middleware)
            .concat(subscriptionApi.middleware)
            .concat(dashboardApi.middleware)

})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;