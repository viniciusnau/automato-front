import { createSlice } from "@reduxjs/toolkit";
import services from "../services";

interface TranscriptState {
  data: any[];
  loading: boolean;
  error: boolean;
  fakeData: any[] | boolean;
}

const initialState: TranscriptState = {
  data: [],
  loading: false,
  error: false,
  fakeData: false,
};

const transcriptSlice = createSlice({
  name: "transcriptSlice",
  initialState,
  reducers: {
    getTranscript: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getTranscriptSuccess: (state, actions) => {
      state.loading = false;
      state.error = false;
      state.data = actions.payload;
    },
    getTranscriptFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
    setFakeDataWords: (state, action) => {
      state.fakeData = action.payload;
    },
  },
});

export const { getTranscript, getTranscriptSuccess, getTranscriptFailure, setFakeDataWords } =
  transcriptSlice.actions;

export default transcriptSlice.reducer;

export const fetchTranscript =
  (id: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "transcriptSlice/getTranscript"
        | "transcriptSlice/getTranscriptSuccess"
        | "transcriptSlice/getTranscriptFailure";
    }) => void
  ) => {
    dispatch(getTranscript());
    try {
      const response = await services.getTranscript(id);
      dispatch(getTranscriptSuccess(response.data));
    } catch (err) {
      console.log("err: ", err);
      dispatch(getTranscriptFailure());
    }
  };
