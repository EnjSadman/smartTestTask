import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../utils/types";

interface InitialState {
  tableKeys : (keyof User)[]
}

const initialState : InitialState = {
  tableKeys: []
}

const TableKeysSlice = createSlice({
  name: "tableKeys",
  initialState,
  reducers: {
    initateTableKeys : (state, action : PayloadAction<(keyof User)[]>) => {
      state.tableKeys = action.payload;
    }
  }
})

export default TableKeysSlice.reducer;

export const {initateTableKeys} = TableKeysSlice.actions;