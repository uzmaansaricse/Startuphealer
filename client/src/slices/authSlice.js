import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  role: localStorage.getItem("role") ? localStorage.getItem("role") : null,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setRole(state,value){
      state.role = value.payload;
      localStorage.setItem('role',value.payload)
    },
    setToken(state, value) {
      state.token = value.payload;
       localStorage.setItem('token',JSON.stringify(value.payload))
    },
  },
});

export const { setSignupData, setLoading, setToken, setRole } = authSlice.actions;

export default authSlice.reducer;