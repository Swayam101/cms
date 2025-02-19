import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdminData } from "../../../types";

interface IUser {
  userData: Partial<IAdminData>;
  role: "user" | "admin";
}

const initialState: IUser = {
  userData: {
    _id: "",
    username: "",
  },
  role: "user",
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
    setRole(state, action: PayloadAction<IUser["role"]>) {
      state.role = action.payload;
    },
  },
});

export const { setAdminData, setRole } = userDataSlice.actions;
export default userDataSlice.reducer;
