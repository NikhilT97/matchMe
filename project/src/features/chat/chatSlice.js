import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  setDoc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../services/firebase';

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ chatId, message, senderId }, { rejectWithValue }) => {
    try {
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      await addDoc(messagesRef, {
        text: message,
        senderId,
        timestamp: serverTimestamp(),
        read: false,
      });
      return { chatId, message, senderId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createChat = createAsyncThunk(
  'chat/createChat',
  async ({ participants }, { rejectWithValue }) => {
    try {
      const chatId = participants.sort().join('_');
      const chatRef = doc(db, 'chats', chatId);
      
      const chatSnap = await getDoc(chatRef);
      
      if (!chatSnap.exists()) {
        await setDoc(chatRef, {
          participants,
          createdAt: serverTimestamp(),
          lastMessage: null,
          lastMessageTime: null,
        });
      }
      
      return chatId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    activeChat: null,
    messages: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createChat.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activeChat = action.payload;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveChat, setMessages, addMessage, clearMessages, clearError } = chatSlice.actions;
export default chatSlice.reducer;