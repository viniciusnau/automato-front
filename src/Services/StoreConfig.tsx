import { combineReducers, configureStore } from "@reduxjs/toolkit";
import transcriptionsSlice from "./Slices/transcriptionsSlice";
import meSlice from "./Slices/meSlice";
import resetPassword from "./Slices/resetPassword";
import transcriptSlice from "./Slices/transcriptSlice";

const reducer = combineReducers({
  transcriptionsSlice,
  meSlice,
  resetPassword,
  transcriptSlice,
});

export const store = configureStore({ reducer });
