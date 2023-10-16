import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface TranscriptionState {
  data: any[];
  loading: boolean;
  error: boolean;
}

const initialState: TranscriptionState = {
  data: [],
  loading: false,
  error: false,
};

const transcriptionsSlice = createSlice({
  name: "transcriptions",
  initialState,
  reducers: {
    getTranscriptions: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getTranscriptionsSuccess: (state, actions) => {
      state.loading = false;
      state.error = false;
      state.data = actions.payload;
    },
    getTranscriptionsFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { getTranscriptions, getTranscriptionsSuccess, getTranscriptionsFailure } = transcriptionsSlice.actions;

export default transcriptionsSlice.reducer;

export const fetchTranscriptions = (page: string, headers: any) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type: "transcriptions/getTranscriptions" | "transcriptions/getTranscriptionsSuccess" | "transcriptions/getTranscriptionsFailure";
    }) => void
  ) => {
    dispatch(getTranscriptions());
    try {
      const response = await services.getTranscriptions(page, headers);
      dispatch(getTranscriptionsSuccess(response.data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getTranscriptionsFailure());
    }
  };
