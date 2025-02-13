import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdminData } from "../../../types";

interface IUser {
  userData: Partial<IAdminData>;
}

const initialState: IUser = {
  userData: {
    _id: "",
    username: "",
  },
};

const userDataSlice = createSlice({
  name: "user data",
  initialState,
  reducers: {
    setAdminData(state, action: PayloadAction<IAdminData>) {
      const { _id, username } = action.payload;
      state.userData._id = _id;
      state.userData.username = username;
    },
  },
});

export const { setAdminData } = userDataSlice.actions;
export default userDataSlice.reducer;
