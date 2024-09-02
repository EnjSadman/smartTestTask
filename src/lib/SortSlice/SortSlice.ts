import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AscDesc, SortTypes } from "../../utils/enums";
import { User } from "../../utils/types";

interface InitialState {
  sortByField: keyof User,
  sortDirection: AscDesc,
}

const initialState : InitialState = {
  sortByField: SortTypes.name,
  sortDirection: AscDesc.ascending,
}

const SortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    
    changeDirection: (state, action : PayloadAction<AscDesc>) => {
      state.sortDirection = action.payload;
    },
    changeField: (state, action : PayloadAction<(keyof User)>) => {
      state.sortByField = action.payload;
    }
  }
})

export default SortSlice.reducer;

export const {changeDirection, changeField} = SortSlice.actions;