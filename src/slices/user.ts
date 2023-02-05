import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  id: '',
  phoneNum: '',
  loginType: '',
  accessToken: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.phoneNum = action.payload.phoneNum;
      state.loginType = action.payload.loginType;
      state.accessToken = action.payload.accessToken;
    },
    setName(state, action) {
      state.name = action.payload;
    },
  },
  extraReducers: builder => {},
});

export default userSlice;
