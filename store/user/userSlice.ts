import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { LoginResponse, UsersState } from '@/types/user';

const initialState: UsersState = {
  user: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
    updateState: (
      state,
      { payload: response }: PayloadAction<LoginResponse>
    ) => {
      state.user = response;
    },
  },
});

export const { unsetUser, updateState } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;

export const selectUser = (state: RootState) => state.user.user;
