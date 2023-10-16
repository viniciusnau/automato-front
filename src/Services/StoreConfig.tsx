import { combineReducers, configureStore } from "@reduxjs/toolkit";
import transcriptionsSlice from "./Slices/transcriptionsSlice";

const reducer = combineReducers({
    transcriptionsSlice
});

export const store = configureStore({ reducer });
