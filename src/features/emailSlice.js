import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`;

const initialState = {
  loading: false,
  error: null,
};

export const sendEmailAsync = createAsyncThunk(
  'auth/sendEmail',
  async ({ sender, email, message }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${AUTH_ENDPOINT}/sendEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender, email, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendEmailAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendEmailAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendEmailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default emailSlice.reducer;
