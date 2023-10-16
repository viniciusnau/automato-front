import { combineReducers, configureStore } from "@reduxjs/toolkit";
import transcriptionsSlice from "./Slices/transcriptionsSlice";
import resetPassword from "./Slices/resetPassword";
import meSlice from "./Slices/meSlice";
import transcribeSlice from "./Slices/transcribeSlice";

const reducer = combineReducers({
  transcriptionsSlice,
  transcribeSlice,
  meSlice,
  resetPassword,
});

export const store = configureStore({ reducer });
