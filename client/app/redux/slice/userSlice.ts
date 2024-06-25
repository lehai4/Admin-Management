import { ProfileType } from "@/type";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  user: ProfileType | null;
}
const initialState: initialStateProps = {
  user: null,
};
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    getUser: (state) => {
      state.user;
    },
  },
});

export const { getUser, setUser } = UserSlice.actions;
export default UserSlice.reducer;
