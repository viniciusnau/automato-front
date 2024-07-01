import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FakeDataState {
  fakeDataWords: any | boolean;
}

const initialState: FakeDataState = {
  fakeDataWords: false,
};

const fakeDataSlice = createSlice({
  name: "fakeDataSlice",
  initialState,
  reducers: {
    setFakeDataWords: (state, action: PayloadAction<any>) => {
      state.fakeDataWords = action.payload;
    },
  },
});

export const { setFakeDataWords } = fakeDataSlice.actions;

export default fakeDataSlice.reducer;
