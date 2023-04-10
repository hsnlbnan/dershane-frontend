import { createSlice } from '@reduxjs/toolkit';

export const AuthSlice = createSlice({
  name: 'authSlice',
  initialState: {
    access_token: null,
    user: null
  },
  reducers: {
    setUser(state, action) {
      state.access_token = action.payload.token;
      state.user = action.payload.user;
    },

    logOutState(state, _) {
      state.access_token = null;
      state.user = null;
    }
  }
});

export const { setUser, logOutState } = AuthSlice.actions;

export default AuthSlice.reducer;
