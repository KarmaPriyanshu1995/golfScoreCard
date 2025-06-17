import { createSlice } from '@reduxjs/toolkit';

type ScoreState = {
  [hole: string]: any; // You can replace 'any' with a more specific type if you know the structure of 'data'
};

const initialState: ScoreState = {};

const scoreSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    updateHoleScore: (state, action) => {
      const { hole, data } = action.payload;
      state[hole] = data;
    },
  },
});

export const { updateHoleScore } = scoreSlice.actions;
export default scoreSlice.reducer;
