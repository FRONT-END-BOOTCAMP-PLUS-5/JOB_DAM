import { createSlice } from '@reduxjs/toolkit';

export interface Member {
  id: string;
  name: string;
  nickname: string;
  email: string;
  createdAt: string;
  img: string | null;
  grade: number | null;
  point: number;
  type: number;
  password: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

export const initialState: { member: Member } = {
  member: {
    id: '',
    name: '',
    nickname: '',
    email: '',
    createdAt: '',
    img: '',
    grade: 0,
    point: 0,
    type: 0,
    password: '',
    updatedAt: '',
    deletedAt: '',
  },
};

export const memberDataSlice = createSlice({
  name: 'login_member_data',
  initialState: initialState,

  reducers: {
    setLoginMemberData: (state, action) => {
      state.member = action.payload;
    },
    resetLoginMemberData: (state) => {
      state.member = {
        id: '',
        name: '',
        nickname: '',
        email: '',
        createdAt: '',
        img: '',
        grade: 0,
        point: 0,
        type: 0,
        password: '',
        updatedAt: '',
        deletedAt: '',
      };
    },
  },
});

export const { setLoginMemberData, resetLoginMemberData } = memberDataSlice.actions;

export default memberDataSlice.reducer;
