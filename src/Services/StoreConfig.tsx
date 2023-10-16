import { combineReducers, configureStore } from "@reduxjs/toolkit";
import transcriptionsSlice from "./Slices/transcriptionsSlice";
import meSlice from "./Slices/meSlice";

const reducer = combineReducers({
    transcriptionsSlice,
    meSlice,
});

export const store = configureStore({ reducer });
