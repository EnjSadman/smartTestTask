import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../utils/types"

interface InitialState {
  users: User[]
}

const initialState : InitialState = {
  users: []
}

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    initializeUsersList : (state, action : PayloadAction<User[]>) => {
      state.users = [...action.payload]
    },
  }
})

export default UsersSlice.reducer;

export const {initializeUsersList} = UsersSlice.actions;