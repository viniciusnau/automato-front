import { combineReducers, configureStore } from "@reduxjs/toolkit";
import transcriptionsSlice from "./Slices/transcriptionsSlice";
import resetPassword from "./Slices/resetPassword";
import meSlice from "./Slices/meSlice";
import transcribeSlice from "./Slices/transcribeSlice";
import uploadSlice from "./Slices/uploadSlice";

const reducer = combineReducers({
  transcriptionsSlice,
  transcribeSlice,
  meSlice,
  resetPassword,
  uploadSlice
});

export const store = configureStore({ reducer });
