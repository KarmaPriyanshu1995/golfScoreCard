import { configureStore } from '@reduxjs/toolkit';
import scoreSliceReducer from './scoreSlice';

export const store = configureStore({
  reducer: {
    scores: scoreSliceReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
