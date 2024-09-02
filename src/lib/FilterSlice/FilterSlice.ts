import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AscDesc, SortTypes } from "../../utils/enums";

interface changeFilterAction {
  type: SortTypes,
  payload: string,
}

interface InitialState {
  nameFilter: string,
  usernameFilter: string,
  emailFilter: string,
  phoneFilter: string,
}

const initialState : InitialState = {
  nameFilter: "",
  usernameFilter: "",
  emailFilter: "",
  phoneFilter: "",
}

const FilterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter : (state, action : PayloadAction<changeFilterAction>) => {
      switch (action.payload.type) {
        case (SortTypes.name) : {
          state.nameFilter = action.payload.payload;
          break;
        }
        case (SortTypes.email) : {
          state.emailFilter = action.payload.payload;
          break;
        }
        case (SortTypes.username) : {
          state.usernameFilter = action.payload.payload;
          break;
        }
        case (SortTypes.phone) : {
          state.phoneFilter = action.payload.payload;
          break;
        }
        default : {
          return state;
        }
      }
    }
  }
})

export default FilterSlice.reducer;

export const {changeFilter} = FilterSlice.actions;