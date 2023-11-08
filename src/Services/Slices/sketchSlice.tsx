import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import services from "../services";

interface SketchState {
  data: any[];
  loading: boolean;
  error: boolean | any[];
}

const initialState: SketchState = {
  data: [],
  loading: false,
  error: false,
};

const sketchSlice = createSlice({
  name: "sketch",
  initialState,
  reducers: {
    postSketch: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    postSketchSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    postSketchFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { postSketch, postSketchSuccess, postSketchFailure } =
  sketchSlice.actions;

export const fetchSketch =
  (sketch: { audio_id: number; transcription: string }) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "sketch/postSketch"
        | "sketch/postSketchSuccess"
        | "sketch/postSketchFailure";
    }) => void
  ) => {
    dispatch(postSketch());
    try {
      await services.postSketch(sketch);
      dispatch(
        postSketchSuccess({ response: "Transcrição agendada com sucesso" })
      );
    } catch (err) {
      console.log("err: ", err);
      dispatch(postSketchFailure());
    }
  };

export default sketchSlice.reducer;
