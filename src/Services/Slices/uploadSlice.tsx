import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import services from "../services";

interface UploadState {
  data: any[];
  loading: boolean;
  error: boolean | any[];
}

const initialState: UploadState = {
  data: [],
  loading: false,
  error: false,
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    postUpload: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    postUploadSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    postUploadFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action?.payload ? action.payload : "";
      state.data = [];
    },
  },
});

export const { postUpload, postUploadSuccess, postUploadFailure } =
  uploadSlice.actions;

export const fetchUpload =
  (formData: FormData) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "upload/postUpload"
        | "upload/postUploadSuccess"
        | "upload/postUploadFailure";
    }) => void
  ) => {
    dispatch(postUpload());
    try {
      const response = await services.upload(formData);
      if (response?.status < 300) {
        dispatch(
          postUploadSuccess({ response: "Transcrição agendada com sucesso" })
        );
      } else if (response?.status === 429) {
        dispatch(
          postUploadFailure({
            status: 429,
          })
        );
      } else {
        throw new Error(response);
      }
    } catch (err) {
      console.log("err: ", err);
      dispatch(postUploadFailure({ status: 429 }));
    }
  };

export default uploadSlice.reducer;
