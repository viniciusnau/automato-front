import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface TranscribeState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: TranscribeState = {
  data: [],
  loading: false,
  error: false,
};

const transcribeSlice = createSlice({
  name: "transcribe",
  initialState,
  reducers: {
    getTranscribe: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getTranscribeSuccess: (state, actions) => {
      state.loading = false;
      state.error = false;
      state.data = actions.payload;
    },
    getTranscribeFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const {
  getTranscribe,
  getTranscribeSuccess,
  getTranscribeFailure,
} = transcribeSlice.actions;

export default transcribeSlice.reducer;

export const fetchTranscribe =
  (page: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "transcribe/getTranscribe"
        | "transcribe/getTranscribeSuccess"
        | "transcribe/getTranscribeFailure";
    }) => void
  ) => {
    dispatch(getTranscribe());
    try {
      const response = await services.getTranscribe(page);
      dispatch(getTranscribeSuccess(response.data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getTranscribeFailure());
    }
  };
