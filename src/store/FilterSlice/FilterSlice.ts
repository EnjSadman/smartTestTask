import { createSlice, PayloadAction } from "@reduxjs/toolkit"
interface InitialState {
  filterValues : string[];
}

const initialState : InitialState = {
  filterValues : []
}

const FilterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter : (state, action : PayloadAction<string[]>) => {
      state.filterValues = [...action.payload];
    }
  }
})

export default FilterSlice.reducer;

export const {changeFilter} = FilterSlice.actions;