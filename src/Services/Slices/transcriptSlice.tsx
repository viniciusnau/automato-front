import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import services from "../services";

interface TranscriptState {
  data: any[];
  loading: boolean;
  error: boolean;
  fakeDataWords: any | boolean;
}

const initialState: TranscriptState = {
  data: [],
  loading: false,
  error: false,
  fakeDataWords: false,
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
    getTranscriptSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    getTranscriptFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
    setFakeDataWords: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.fakeDataWords = {
          "jobName": "4",
          "accountId": "818812123842",
          "status": "COMPLETED",
          "results": {
            "transcripts": [
              {
                "transcript": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
            ],
            "items": [
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.98", "content": "Lorem" }
                ],
                "start_time": "0.209",
                "end_time": "0.54"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.992", "content": "ipsum" }
                ],
                "start_time": "0.55",
                "end_time": "0.56"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.983", "content": "dolor" }
                ],
                "start_time": "0.569",
                "end_time": "0.649"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.997", "content": "sit" }
                ],
                "start_time": "0.66",
                "end_time": "1.289"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.997", "content": "amet" }
                ],
                "start_time": "1.299",
                "end_time": "1.37"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.939", "content": "consectetur" }
                ],
                "start_time": "1.379",
                "end_time": "2.0"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.999", "content": "adipiscing" }
                ],
                "start_time": "2.009",
                "end_time": "2.46"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.992", "content": "elit" }
                ],
                "start_time": "2.47",
                "end_time": "2.539"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.991", "content": "Sed" }
                ],
                "start_time": "2.549",
                "end_time": "2.94"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.997", "content": "do" }
                ],
                "start_time": "2.95",
                "end_time": "3.42"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.995", "content": "eiusmod" }
                ],
                "start_time": "3.43",
                "end_time": "3.74"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.999", "content": "tempor" }
                ],
                "start_time": "3.75",
                "end_time": "4.23"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.995", "content": "incididunt" }
                ],
                "start_time": "4.239",
                "end_time": "4.42"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.998", "content": "ut" }
                ],
                "start_time": "4.429",
                "end_time": "4.619"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.999", "content": "labore" }
                ],
                "start_time": "4.63",
                "end_time": "4.699"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.996", "content": "et" }
                ],
                "start_time": "4.71",
                "end_time": "4.739"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.998", "content": "dolore" }
                ],
                "start_time": "4.75",
                "end_time": "4.98"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.938", "content": "magna" }
                ],
                "start_time": "4.989",
                "end_time": "5.019"
              },
              {
                "type": "pronunciation",
                "alternatives": [
                  { "confidence": "0.999", "content": "aliqua" }
                ],
                "start_time": "5.03",
                "end_time": "5.42"
              },
              {
                "type": "punctuation",
                "alternatives": [
                  { "confidence": "0.0", "content": "." }
                ]
              }
            ]
          }
        };
      } else {
        state.fakeDataWords = false;
      }
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
