import { configureStore } from '@reduxjs/toolkit';
import ChatSlice from './Slices/ChatSlice';

const store = configureStore({
  reducer: {
    chat: ChatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
