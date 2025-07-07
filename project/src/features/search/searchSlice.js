import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '../../services/firebase';

export const searchProfiles = createAsyncThunk(
  'search/searchProfiles',
  async ({ filters, userId }, { rejectWithValue }) => {
    try {
      let q = query(collection(db, 'users'));
      
      // Add filters
      if (filters.ageRange) {
        q = query(q, where('age', '>=', filters.ageRange[0]), where('age', '<=', filters.ageRange[1]));
      }
      if (filters.religion) {
        q = query(q, where('religion', '==', filters.religion));
      }
      if (filters.location) {
        q = query(q, where('location', '==', filters.location));
      }
      if (filters.education) {
        q = query(q, where('education', '==', filters.education));
      }
      
      // Exclude current user
      q = query(q, where('__name__', '!=', userId));
      
      // Add ordering and limit
      q = query(q, orderBy('createdAt', 'desc'), limit(20));
      
      const querySnapshot = await getDocs(q);
      const profiles = [];
      
      querySnapshot.forEach((doc) => {
        profiles.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return profiles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    profiles: [],
    filters: {
      ageRange: [18, 50],
      religion: '',
      location: '',
      education: '',
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearProfiles: (state) => {
      state.profiles = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProfiles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProfiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profiles = action.payload;
      })
      .addCase(searchProfiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearProfiles, clearError } = searchSlice.actions;
export default searchSlice.reducer;