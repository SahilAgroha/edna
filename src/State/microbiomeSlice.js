import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadMicrobiomeData, fetchAllOverviews, fetchAnalysisById } from './api';

const initialState = {
  overviews: [],
  currentAnalysis: null,
  status: 'idle',
  currentAbundanceData: null, 
  error: null,
};

export const uploadDataAsync = createAsyncThunk(
  'microbiome/uploadData',
  async (data) => {
    const response = await uploadMicrobiomeData(data);
    return response;
  }
);

export const fetchOverviewsAsync = createAsyncThunk(
  'microbiome/fetchOverviews',
  async () => {
    const response = await fetchAllOverviews();
    return response;
  }
);

export const fetchAnalysisAsync = createAsyncThunk(
  'microbiome/fetchAnalysis',
  async (analysisId) => {
    const response = await fetchAnalysisById(analysisId);
    return response;
  }
);

const microbiomeSlice = createSlice({
  name: 'microbiome',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadDataAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add logic to handle the success message or newly created overview
      })
      .addCase(uploadDataAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchOverviewsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOverviewsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.overviews = action.payload;
      })
      .addCase(fetchOverviewsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAnalysisAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnalysisAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentAnalysis = action.payload; // Store the full analysis data
      })
      .addCase(fetchAnalysisAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

  },
});

export const { setAbundanceData } = microbiomeSlice.actions;
export default microbiomeSlice.reducer;