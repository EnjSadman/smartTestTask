import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AscDesc, SortTypes } from "../../utils/enums";

interface InitialState {
  sortByField: SortTypes,
  sortDirection: AscDesc,
}

const initialState : InitialState = {
  sortByField: SortTypes.name,
  sortDirection: AscDesc.ascending,
}

const SortSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    
    changeDirection: (state, action : PayloadAction<AscDesc>) => {
      state.sortDirection = action.payload;
    },
    changeField: (state, action : PayloadAction<SortTypes>) => {
      state.sortByField = action.payload;
    }
  }
})

export default SortSlice.reducer;

export const {changeDirection, changeField} = SortSlice.actions;