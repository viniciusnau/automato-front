import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import services from "../services";

interface UploadState {
  data: any[];
  loading: boolean;
  error: boolean;
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
    getUpload: (state) => {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    getUploadSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    },
    getUploadFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.data = [];
    },
  },
});

export const { getUpload, getUploadSuccess, getUploadFailure } =
  uploadSlice.actions;

export const fetchUpload = (formData: FormData) => async (dispatch: any) => {
  dispatch(getUpload());
  try {
    await services.upload(formData);
    dispatch(
      getUploadSuccess({ response: "Transcrição agendada com sucesso" })
    );
  } catch (err) {
    console.log("err: ", err);
    dispatch(getUploadFailure());
  }
};

export default uploadSlice.reducer;
