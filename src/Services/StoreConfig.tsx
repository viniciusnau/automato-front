import { combineReducers, configureStore } from "@reduxjs/toolkit";
import transcriptionsSlice from "./Slices/transcriptionsSlice";
import meSlice from "./Slices/meSlice";
import resetPassword from "./Slices/resetPassword";
import transcriptSlice from "./Slices/transcriptSlice";
import transcribeSlice from "./Slices/transcribeSlice";
import uploadSlice from "./Slices/uploadSlice";
import deleteFileSlice from "./Slices/deleteFileSlice";

const reducer = combineReducers({
  transcriptionsSlice,
  transcribeSlice,
  meSlice,
  resetPassword,
  transcriptSlice,
  uploadSlice,
  deleteFileSlice,
});

export const store = configureStore({ reducer });
