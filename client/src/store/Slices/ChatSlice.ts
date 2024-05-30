import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

interface ChatState {
  messages: ChatMessage[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
