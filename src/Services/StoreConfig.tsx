import { combineReducers, configureStore } from "@reduxjs/toolkit";
import transcriptionsSlice from "./Slices/transcriptionsSlice";
import resetPassword from "./Slices/resetPassword";
import meSlice from "./Slices/meSlice";

const reducer = combineReducers({
  transcriptionsSlice,
  meSlice,
  resetPassword,
});

export const store = configureStore({ reducer });
