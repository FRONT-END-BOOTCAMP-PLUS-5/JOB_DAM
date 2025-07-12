import { createSlice } from '@reduxjs/toolkit';

export interface Member {
  id: string;
  name: string;
  nickname: string;
  email: string;
  createdAt: string;
  img: string | null;
  grade: number;
  point: number;
  type: number;
}

export const memberDataSlice = createSlice({
  name: 'login_member_data',
  initialState: {
    member: {
      id: '',
      name: '',
      nickname: '',
      email: '',
      createdAt: '',
    },
  },
  reducers: {
    setLoginMemberData: (state, action) => {
      state.member = action.payload;
    },
  },
});

export const setLoginState = memberDataSlice.actions;

export default memberDataSlice.reducer;
