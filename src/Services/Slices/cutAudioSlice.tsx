import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CutAudioState {
    duration: number;
    sliderValues: number[];
}

const initialState: CutAudioState = {
    duration: 0,
    sliderValues: [0, 0],
};

const cutAudioSlice = createSlice({
    name: 'cutAudio',
    initialState,
    reducers: {
        setAudioDuration(state, action: PayloadAction<number>) {
            state.duration = action.payload;
        },
        setSliderValues(state, action: PayloadAction<number[]>) {
            state.sliderValues = action.payload;
        },
    },
});

export const { setAudioDuration, setSliderValues } = cutAudioSlice.actions;

export default cutAudioSlice.reducer;
